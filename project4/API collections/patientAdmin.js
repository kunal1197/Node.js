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
    const requestUrl = `${C.url}Patient/${patientId}?practiceId=${practiceId}`;

    const response = await axios({
      method: "get",
      url: requestUrl,
      headers: getHeaders(datasource),
    });

    return response.data.data || {};
  } catch (err) {
    console.log({ fnName: "getPatient", err });
  }
}

async function getDiagnosis(patientId, encounterId, datasource) {
  try {
    const requestUrl = `${C.url}Observation?patient=${patientId}&category=exam&encounter=${encounterId}`;

    const response = await axios({
      method: "get",
      url: requestUrl,
      headers: getHeaders(datasource),
    });

    return response.data.data || {};
  } catch (err) {
    console.log({ fnName: "getDiagnosis", err });
  }
}

async function getAllergy(patientId, practiceId, deptId, datasource) {
  try {
    const requestUrl = `${C.url}AllergyIntolerance/?patient=${patientId}&practiceId=${practiceId}&departmentId=${deptId}`;

    const response = await axios({
      method: "get",
      url: requestUrl,
      headers: getHeaders(datasource),
    });

    return response.data.data || {};
  } catch (err) {
    console.log({ fnName: "getAllergy", err });
  }
}

async function getVisit(patientId, deptId, datasource) {
  try {
    const requestUrl = `${C.url}Encounter?patient=Patient/${patientId}&departmentId=${deptId}`;
    const response = await axios({
      method: "get",
      url: requestUrl,
      headers: getHeaders(datasource),
    });

    return response.data.data || {};
  } catch (err) {
    console.log({ fnName: "getVisit", err });
  }
}

async function getProvider(practiceId, datasource) {
  try {
    const requestUrl = `${C.url}Location?practiceId=$${practiceId}`;

    const response = await axios({
      method: "get",
      url: requestUrl,
      headers: getHeaders(datasource),
    });

    return response.data.data || {};
  } catch (err) {
    console.log({ fnName: "getProvider", err });
  }
}

async function getInsurance(patientId, practiceId, deptId, datasource) {
  try {
    const requestUrl = `${C.url}Coverage/?patient=${patientId}&practiceId=${practiceId}&departmentId=${deptId}`;

    const response = await axios({
      method: "get",
      url: requestUrl,
      headers: getHeaders(datasource),
    });

    return response.data.data || {};
  } catch (err) {
    console.log({ fnName: "getInsurance", err });
  }
}

async function getPatientAdmin({
  patientId = DEFAULT_PATIENT_ID,
  practiceId = DEFAULT_PRACTICE_ID,
  deptId = DEFAULT_DEPT_ID,
  encounterId = DEFAULT_ECOUNTER_ID,
  datasource = "athena",
}) {
  try {
    const patientRes = await getPatient(patientId, practiceId, datasource);
    const diagnosisRes = await getDiagnosis(patientId, encounterId, datasource);
    const allergyRes = await getAllergy(
      patientId,
      practiceId,
      deptId,
      datasource
    );
    const visitRes = await getVisit(patientId, deptId, datasource);
    const providerRes = await getProvider(practiceId, deptId, datasource);
    const insuranceRes = await getInsurance(
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
      diagnosis: diagnosisRes,
      allergy: allergyRes,
      visit: visitRes,
      provider: providerRes,
      Guarantor: "Not Presented",
      insurance: insuranceRes,
    };

    console.log("success");

    return response;
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  getPatientAdmin,
};
