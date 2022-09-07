const axios = require("axios"); // axios is a library that allows us to make HTTP requests
const C = require("./constants-demo");

const {
  getHeaders,
  getReqUrl,
  DEFAULT_DEPT_ID,
  DEFAULT_ECOUNTER_ID,
  DEFAULT_PATIENT_ID,
  DEFAULT_PRACTICE_ID,
} = require("./constants");

async function getPatient(patientId, practiceId, datasource) {
  try {
    const requestUrl = `${getReqUrl()}Patient/${patientId}?practiceId=${practiceId}`;

    const response = await axios({
      method: "get",
      url: requestUrl,
      headers: getHeaders(datasource),
    });

    return response.data.data || {};
  } catch (err) {
    console.log(err);
  }
}

async function getVisit(patientId, deptId, datasource) {
  try {
    const requestUrl = `${getReqUrl()}Encounter?patient=Patient/${patientId}&departmentId=${deptId}`;

    const response = await axios({
      method: "get",
      url: requestUrl,
      headers: getHeaders(datasource),
    });

    return response.data.data || {};
  } catch (err) {
    console.log(err);
  }
}

async function getObservation(patientId, practiceId, deptId, datasource) {
  try {
    const requestUrl = `${getReqUrl()}Observation?patient=${patientId}&category=vital-signs&practiceId=${practiceId}&departmentId=${deptId}`;

    const response = await axios({
      method: "get",
      url: requestUrl,
      headers: getHeaders(datasource),
    });

    return response.data.data || {};
  } catch (err) {
    console.log(err);
  }
}

async function getFlowSheet({
  patientId = DEFAULT_PATIENT_ID,
  practiceId = DEFAULT_PRACTICE_ID,
  deptId = DEFAULT_DEPT_ID,
  encounterId = DEFAULT_ECOUNTER_ID,
  datasource = "athena",
}) {
  try {
    const patientRes = await getPatient(patientId, practiceId, datasource);
    const visitRes = await getVisit(patientId, deptId, datasource);
    const coverageRes = await getObservation(
      patientId,
      practiceId,
      deptId,
      datasource
    );

    const response = {
      patientId,
      practiceId,
      encounterId,
      datasource,
      patient: patientRes,
      Contacts: "Not Presented",
      visit: visitRes,
      coverage: coverageRes,
    };

    console.log("success");

    return response;
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  getFlowSheet,
};
