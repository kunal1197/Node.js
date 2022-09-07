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
    console.log({ fnName: "getPatient", err });
    return {};
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
    console.log({ fnName: "getVisit", err });
    return {};
  }
}

async function getCoverage(patientId, practiceId, deptId, datasource) {
  try {
    const requestUrl = `${getReqUrl()}Coverage/?patient=${patientId}&practiceId=${practiceId}&departmentId=${deptId}`;
    const response = await axios({
      method: "get",
      url: requestUrl,
      headers: getHeaders(datasource),
    });
    return response.data.data || {};
  } catch (err) {
    console.log({ fnName: "getCoverage", err });
    return {};
  }
}

async function getAllergy(patientId, practiceId, deptId, datasource) {
  try {
    const requestUrl = `${getReqUrl()}AllergyIntolerance/?patient=${patientId}&practiceId=${practiceId}&departmentId=${deptId}`;
    const response = await axios({
      method: "get",
      url: requestUrl,
      headers: getHeaders(datasource),
    });
    return response.data.data || {};
  } catch (err) {
    console.log({ fnName: "getAllergy", err });
    return {};
  }
}

async function getFamilyHistory(patientId, practiceId, deptId, datasource) {
  try {
    const requestUrl = `${getReqUrl()}FamilyMemberHistory?patient=${patientId}&practiceId=${practiceId}&departmentId=${deptId}`;
    const response = await axios({
      method: "get",
      url: requestUrl,
      headers: getHeaders(datasource),
    });
    return response.data.data || {};
  } catch (err) {
    console.log({ fnName: "getFamilyHistory", err });
    return {};
  }
}

async function immunizations(patientId, practiceId, deptId, datasource) {
  try {
    const requestUrl = `${getReqUrl()}Immunization/?patient=${patientId}&practiceId=${practiceId}&departmentId=${deptId}`;
    const response = await axios({
      method: "get",
      url: requestUrl,
      headers: getHeaders(datasource),
    });
    return response.data.data || {};
  } catch (err) {
    console.log({ fnName: "immunizations", err });
    return {};
  }
}

async function medicationTexts(patientId, practiceId, deptId, datasource) {
  try {
    const requestUrl = `${getReqUrl()}MedicationStatement?patient=${patientId}&practiceId=${practiceId}&departmentId=${deptId}`;
    const response = await axios({
      method: "get",
      url: requestUrl,
      headers: getHeaders(datasource),
    });
    return response.data.data || {};
  } catch (err) {
    console.log({ fnName: "medicationTexts", err });
    return {};
  }
}

async function problemsText(patientId, practiceId, deptId, datasource) {
  try {
    const requestUrl = `${getReqUrl()}Observation?patient=${patientId}&category=vital-signs&practiceId=${practiceId}&departmentId=${deptId}`;
    const response = await axios({
      method: "get",
      url: requestUrl,
      headers: getHeaders(datasource),
    });
    return response.data.data || {};
  } catch (err) {
    console.log({ fnName: "problemsText", err });
    return {};
  }
}

async function procedureTexts(patientId, practiceId, deptId, datasource) {
  try {
    const requestUrl = `${getReqUrl()}Procedure?patient=${patientId}&practiceId=${practiceId}&departmentId=${deptId}`;
    const response = await axios({
      method: "get",
      url: requestUrl,
      headers: getHeaders(datasource),
    });
    return response.data.data || {};
  } catch (err) {
    console.log({ fnName: "procedureTexts", err });
  }
}

async function resultsText(patientId, encounterId, datasource) {
  try {
    const requestUrl = `${getReqUrl()}Observation?patient=${patientId}&category=exam&encounter=${encounterId}`;

    const response = await axios({
      method: "get",
      url: requestUrl,
      headers: getHeaders(datasource),
    });
    return response.data.data || {};
  } catch (err) {
    console.log({ fnName: "resultsText", err });
  }
}

async function getClinicalSummary({
  patientId = DEFAULT_PATIENT_ID,
  practiceId = DEFAULT_PRACTICE_ID,
  deptId = DEFAULT_DEPT_ID,
  encounterId = DEFAULT_ECOUNTER_ID,
  datasource = "athena",
} = {}) {
  try {
    // console.log({ patientId, practiceId, deptId, encounterId, datasource });

    const allergyRes = await getAllergy(
      patientId,
      practiceId,
      deptId,
      datasource
    );

    const coverageRes = await getCoverage(
      patientId,
      practiceId,
      deptId,
      datasource
    );
    const patientRes = await getPatient(patientId, practiceId, datasource);
    const visitRes = await getVisit(patientId, deptId, datasource);
    const familyHistoryRes = await getFamilyHistory(
      patientId,
      practiceId,
      deptId,
      datasource
    );
    const immunizationsRes = await immunizations(
      patientId,
      practiceId,
      deptId,
      datasource
    );
    const medicationTextsRes = await medicationTexts(
      patientId,
      practiceId,
      deptId,
      datasource
    );
    const problemsTextRes = await problemsText(
      patientId,
      practiceId,
      deptId,
      datasource
    );
    const procedureTextsRes = await procedureTexts(
      patientId,
      practiceId,
      deptId,
      datasource
    );

    const resultsTextRes = await resultsText(
      patientId,
      encounterId,
      datasource
    );

    const response = {
      patientId,
      practiceId,
      encounterId,
      datasource,
      Confidentiality: "Not Presented",
      Custodian: "Not Presented",
      patient: patientRes,
      visit: visitRes,
      AdvancedDirectives: "Not Presented",
      allergy: allergyRes,
      Family_History: familyHistoryRes,
      FunctionalStatus: "Not Presented",
      HealthConcernsText: "Not Presented",
      immunizations: immunizationsRes,
      InsuranceText: coverageRes,
      MedicalHistoryText: "Not Presented",
      medicationTexts: medicationTextsRes,
      problemsText: problemsTextRes,
      procedureTexts: procedureTextsRes,
      ResolvedProblemsText: "Not Presented",
      resultsText: resultsTextRes,
      SocialHistoryText: "Not Presented",
    };

    console.log("success");

    return response;
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  getClinicalSummary,
};
