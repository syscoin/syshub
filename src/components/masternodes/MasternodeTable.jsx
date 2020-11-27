import React, { Component } from "react";
import axios from "axios";
import { withTranslation } from "react-i18next";


import RemotePagination from "./RemotePagination";


class MasternodeTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataload: 0,
      page: 1,
      tableData: [],
      sizePerPage: this.props.sizePerPage || 10,
      totalRecords: 0,
    };
    this.searchInTable = this.searchInTable.bind(this);
    this.resetSearch = this.resetSearch.bind(this);
    this.onSizeChange = this.onSizeChange.bind(this);
    this.changeFieldOrder = this.changeFieldOrder.bind(this);
  }
  componentDidMount() {
    this.loadData();
  }
  componentWillUnmount() {
    this.source.cancel('Request has been canceled')
  }
  searchInTable(e) {
    this.loadData(e.target.value);
  }
  resetSearch() {
    document.getElementById("srcVal").value = "";
    this.loadData();
  }
  handleTableChange = (type, { page, sizePerPage }) => {
    this.setState({
      dataload: 0,
    });
    var src = document.getElementById("srcVal").value;
    this.loadData(src, page, sizePerPage);
  };
  changeFieldOrder(field, order) {}
  onSizeChange(e) {
    var size = e.target.value;
    var pagenum = this.state.page;
    var src = document.getElementById("srcVal").value;
    this.loadData(src, pagenum, size);
  }
  async loadData(srcData, page, sizePerPage) {
    var postData = {
      page: this.state.page,
      search: "",
      sortBy: "lastPayment",
      sortDesc: true,
      perPage: this.state.sizePerPage,
    };
    if (srcData !== undefined && parseInt(page) >= 1) {
      postData.page = page;
      this.setState({
        page: page,
      });
    }
    if (sizePerPage !== undefined && parseInt(sizePerPage) >= 1) {
      postData.perPage = sizePerPage;
      this.setState({
        sizePerPage: sizePerPage,
      });
    }
    if (srcData !== undefined && srcData !== "") {
      postData.search = srcData;
    }
    // console.log(postData);
    const CancelToken = axios.CancelToken;
    this.source = CancelToken.source();
    let axiosConfig = {
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        Accept: "application/json, text/plain, */*",
        "Access-Control-Allow-Origin": "*",
      },
      cancelToken: this.source.token
    };

    await axios
      .post("https://syscoin.dev/mnSearch", postData, axiosConfig)
      .then((res) => {
        this.setState({
          dataload: 1,
          tableData: res.data.returnArr,
          totalRecords: res.data.mnNumb,
        });
      })
      .catch((err) => {
        this.setState({
          dataload: 2,
        });
      });
  }

  render() {
    const { dataload, page, tableData, sizePerPage, totalRecords } = this.state;
    const { t } = this.props;

    if (dataload === 1) {
      return (
        <>
          <div className="input-form">
            <input
              id="srcVal"
              type="text"
              className="ip"
              placeholder={t("check.table.ipInput")}
              onKeyUp={this.searchInTable}
            />

            <button
              type="button"
              className="btn btn--blue"
              onClick={this.resetSearch}
              style={{
                margin: "20px auto",
                width: "150px",
                display: "block",
              }}
            >
              {t("check.table.resetBtn")}
            </button>
          </div>

          <RemotePagination
            data={tableData}
            page={page}
            sizePerPage={sizePerPage}
            totalSize={totalRecords}
            onTableChange={this.handleTableChange}
            onSizeChange={this.onSizeChange}
            changeFieldOrder={this.changeFieldOrder}
            t={t}
            simple={this.props.simple}
          />
        </>
      );
    } else {
      return (
        <p>{t("check.loading")}</p>
      );
    }
  }
}

export default withTranslation()(MasternodeTable);