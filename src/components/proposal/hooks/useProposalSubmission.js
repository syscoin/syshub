import { useCallback, useRef } from 'react'
import swal from 'sweetalert2'
import axios from 'axios'

import { submitProposal, updateProposal, getOneProposal } from '../../../utils/request'
import {
  getAxiosErrorFooter,
  getAxiosErrorMessage,
  logAxiosError,
} from '../../../utils/errorHandler'

const TEN_MINUTES_MS = 10 * 60 * 1000
const FRONTEND_RETRY_DELAY_MS = 2000
const FRONTEND_MAX_ATTEMPTS = 3
const TIMER_INTERVAL_MS = 1000

const useProposalSubmission = ({
  proposalUid,
  history,
  setSubmitCommand,
  onPaymentTxIdEntered,
}) => {
  const ensureProposalUid = useCallback(async () => {
    if (!proposalUid) {
      await swal.fire({
        icon: 'error',
        title: 'There was an error',
        text: 'Missing proposal identifier. Please prepare the proposal first.',
      })
      return false
    }
    return true
  }, [proposalUid])

  const cancelSourceRef = useRef(null)

  const createCancelSource = useCallback(() => {
    if (cancelSourceRef.current) {
      cancelSourceRef.current.cancel('Operation superseded')
    }
    const source = axios.CancelToken.source()
    cancelSourceRef.current = source
    return source
  }, [])

  const clearCancelSource = useCallback((source) => {
    if (cancelSourceRef.current === source) {
      cancelSourceRef.current = null
    }
  }, [])

  const enterPaymentTxId = useCallback(
    async (data) => {
      const isReady = await ensureProposalUid()
      if (!isReady) return

      swal.fire({
        title: 'Creating submit command',
        showConfirmButton: false,
        willOpen: () => {
          swal.showLoading()
        },
      })

      const { paymentTxId } = data
      const cancelSource = createCancelSource()

      let prepareObjectProposal

      try {
        const updateResponse = await updateProposal(
          proposalUid,
          { txId: paymentTxId },
          { cancelToken: cancelSource.token },
        )
        prepareObjectProposal = updateResponse?.data?.proposal?.prepareObjectProposal

        if (!prepareObjectProposal) {
          throw new Error('The prepare payload is missing from the update response.')
        }

        const submitResponse = await submitProposal(proposalUid, {
          ...prepareObjectProposal,
          txId: paymentTxId,
        })
        const commandSubmit = submitResponse?.data?.commandSubmit

        if (!commandSubmit) {
          throw new Error('Submit command was not returned by the API.')
        }

        setSubmitCommand(commandSubmit)

        await swal.fire({
          icon: 'success',
          title: 'Submit command created',
          timer: 2000,
          showConfirmButton: false,
        })

        // Advance to the next step (Step 6: Submit proposal)
        if (onPaymentTxIdEntered) {
          onPaymentTxIdEntered()
        }
      } catch (error) {
        logAxiosError('useProposalSubmission::enterPaymentTxId', error, {
          proposalUid,
          paymentTxId,
          hasPreparePayload: Boolean(prepareObjectProposal),
        })

        const errorMessage = getAxiosErrorMessage(error, 'Unable to create submit command.')
        const footer = getAxiosErrorFooter(error)

        await swal.fire({
          icon: 'error',
          title: 'There was an error',
          text: errorMessage,
          footer,
        })
      } finally {
        clearCancelSource(cancelSource)
      }
    },
    [clearCancelSource, createCancelSource, ensureProposalUid, proposalUid, setSubmitCommand, onPaymentTxIdEntered]
  )

  const confirmProposalCompletion = useCallback(
    async (proposalId, expectedHash) => {
      if (!proposalId) {
        return { isCompleted: false }
      }

      try {
        const response = await getOneProposal(proposalId)
        const savedProposal = response?.data?.proposal

        if (!savedProposal) {
          return { isCompleted: false }
        }

        const normalizedExpectedHash = typeof expectedHash === 'string'
          ? expectedHash.trim().toLowerCase()
          : ''

        const candidateHashes = [
          savedProposal.hash,
          savedProposal.proposalHash,
          savedProposal.proposal_hash,
        ]
          .filter((value) => typeof value === 'string' && value.trim().length > 0)
          .map((value) => value.trim().toLowerCase())

        const matchesHash = Boolean(
          normalizedExpectedHash && candidateHashes.includes(normalizedExpectedHash)
        )

        const isComplete = Boolean(
          savedProposal.complete === true ||
          savedProposal.status === 'complete' ||
          savedProposal.state === 'complete' ||
          matchesHash
        )

        return {
          isCompleted: isComplete,
          matchesHash,
          resolvedHash: candidateHashes[0] || null,
        }
      } catch (statusError) {
        logAxiosError('useProposalSubmission::confirmProposalCompletion', statusError, { proposalId })
        return { isCompleted: false }
      }
    },
    []
  )

  const enterProposalHash = useCallback(
    async (data) => {
      const isReady = await ensureProposalUid()
      if (!isReady) return

      const { proposalHash } = data
      const retryPayload = { hash: proposalHash, complete: true, maxRetryCount: 30 }
      const cancelSource = createCancelSource()

      let timerInterval = null
      let timedOut = false

      const timeoutId = setTimeout(() => {
        timedOut = true
        cancelSource.cancel('Proposal submission timed out')
      }, TEN_MINUTES_MS)

      const swalPromise = swal
        .fire({
          title: 'Creating the proposal',
          html: 'Time remaining: <b>10:00</b>',
          showConfirmButton: false,
          allowOutsideClick: false,
          allowEscapeKey: false,
          timer: TEN_MINUTES_MS,
          timerProgressBar: true,
          didOpen: () => {
            swal.showLoading()
            const content = swal.getHtmlContainer()
            const timeDisplay = content?.querySelector('b')
            timerInterval = setInterval(() => {
              const timeLeft = swal.getTimerLeft()
              if (typeof timeLeft === 'undefined' || timeLeft === null) {
                return
              }
              if (timeLeft <= 0) {
                timedOut = true
                if (timerInterval) {
                  clearInterval(timerInterval)
                }
                return
              }
              const minutes = Math.floor(timeLeft / 60000)
              const seconds = Math.floor((timeLeft % 60000) / 1000)
              if (timeDisplay) {
                timeDisplay.textContent = `${String(minutes).padStart(2, '0')}:${String(
                  seconds
                ).padStart(2, '0')}`
              }
            }, TIMER_INTERVAL_MS)
          },
          willClose: () => {
            if (timerInterval) {
              clearInterval(timerInterval)
            }
          },
        })
        .then((result) => {
          if (result.dismiss === swal.DismissReason.timer) {
            timedOut = true
          }
        })
        .catch(() => {
          // swal handles dismissals internally
        })

      try {
        let attempts = 0
        while (attempts < FRONTEND_MAX_ATTEMPTS) {
          try {
            await updateProposal(proposalUid, retryPayload, {
              cancelToken: cancelSource.token,
            })
            break
          } catch (err) {
            attempts += 1
            if (attempts >= FRONTEND_MAX_ATTEMPTS) {
              throw err
            }
            // eslint-disable-next-line no-await-in-loop
            await new Promise((resolve) => setTimeout(resolve, FRONTEND_RETRY_DELAY_MS))
          }
        }

        if (timedOut) {
          throw new Error('Proposal submission timed out')
        }

        swal.close()
        await swalPromise.catch(() => undefined)

        await swal.fire({
          icon: 'success',
          title: 'The proposal was created',
          timer: 2000,
          showConfirmButton: false,
        })
        history.push('/governance')
      } catch (error) {
        await swalPromise.catch(() => undefined)
        const timedOutMessage = 'Proposal submission failed. Please verify that the proposal is not displayed on the Governance page, and if not, try again in 5 minutes.'
        const defaultMessage = 'Proposal submission failed. Please try again in 5mins.'
        const isTimeoutError =
          error.message === 'Proposal submission timed out' || axios.isCancel(error)

        const completionCheck = await confirmProposalCompletion(proposalUid, proposalHash)

        if (completionCheck.isCompleted) {
          const footerDetails = []
          const footerFromError = getAxiosErrorFooter(error)
          const errorMessage = getAxiosErrorMessage(error, defaultMessage)

          footerDetails.push(errorMessage)
          if (footerFromError) {
            footerDetails.push(footerFromError)
          }
          if (completionCheck.resolvedHash) {
            footerDetails.push(`Hash detected: ${completionCheck.resolvedHash}`)
          }

          await swal.fire({
            icon: isTimeoutError ? 'warning' : 'success',
            title: 'Proposal creation confirmed after timeout',
            text: 'The proposal appears to have been registered even though the server timed out. You can confirm it from the governance page.',
            footer: footerDetails.join('<br />'),
          })

          history.push('/governance')
          return
        }

        logAxiosError('useProposalSubmission::enterProposalHash', error, {
          proposalUid,
          proposalHash,
        })

        const messageToShow = isTimeoutError ? timedOutMessage : defaultMessage
        const footer = getAxiosErrorFooter(error)
        const errorText = isTimeoutError
          ? undefined
          : getAxiosErrorMessage(error, defaultMessage)

        await swal.fire({
          icon: 'error',
          title: messageToShow,
          text: errorText,
          footer,
        })
      } finally {
        if (timerInterval) {
          clearInterval(timerInterval)
        }
        clearTimeout(timeoutId)
        clearCancelSource(cancelSource)
      }
    },
    [clearCancelSource, createCancelSource, ensureProposalUid, history, proposalUid, confirmProposalCompletion]
  )

  return { enterPaymentTxId, enterProposalHash }
}

export default useProposalSubmission

