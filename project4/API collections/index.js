// http://localhost:3000/patient-admin?datasource=athena&patientId=2
// http://localhost:3000/flowsheet-data
// http://localhost:3000/clinical-summary?patientId=26604&practiceId=1&deptId=1&datasource=athena
// http://localhost:3000/scheduling?patientId=26604&practiceId=1&deptId=1&datasource=athena&encounterId=1&practionerId=1962
const express = require("express");
const app = express();
const port = 3000;
const { getClinicalSummary } = require("./clinicalSummary");
const { getFlowSheet } = require("./flowSheet");
const { getPatientAdmin } = require("./patientAdmin");
const { getSchedule } = require("./scheduling");
const C = require("./constants-demo");
const axios = require("axios");
const { getHeaders } = require("./constants");

app.get("/clinical-summary", async (req, res) => {
  try {
    const { patientId, practiceId, deptId, datasource } = req.query;
    console.log(datasource);
    const response = await getClinicalSummary({
      patientId,
      practiceId,
      deptId,
      datasource,
    });
    res.json(response);
  } catch (err) {
    console.log(err);
  }
});

app.get("/flowsheet-data", async (req, res) => {
  try {
    const { patientId, practiceId, deptId, encounterId, datasource } =
      req.query;
    const response = await getFlowSheet({
      patientId,
      practiceId,
      deptId,
      encounterId,
      datasource,
    });
    res.json(response);
  } catch (err) {
    console.log(err);
  }
});

app.get("/patient-admin", async (req, res) => {
  try {
    const { patientId, practiceId, deptId, encounterId, datasource } =
      req.query;
    const response = await getPatientAdmin({
      patientId,
      practiceId,
      deptId,
      encounterId,
      datasource,
    });
    res.json(response);
  } catch (err) {
    console.log(err);
  }
});

app.get("/scheduling", async (req, res) => {
  try {
    const { patientId, practiceId, deptId, encounterId, datasource } =
      req.query;
    const response = await getSchedule({
      patientId,
      practiceId,
      deptId,
      encounterId,
      datasource,
    });
    res.json(response);
  } catch (err) {
    console.log(err);
  }
});

app.get("/test-api", async (req, res) => {
  try {
    const { patientId, practiceId, deptId, datasource = "athena" } = req.query;

    const requestUrl = `${C.url}AllergyIntolerance/?patient=${patientId}&practiceId=${practiceId}&departmentId=${deptId}`;

    const response = await axios({
      method: "get",
      url: requestUrl,
      headers: getHeaders(datasource),
    });

    res.json(response.data.data || {});
  } catch (err) {
    console.log(err);
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
