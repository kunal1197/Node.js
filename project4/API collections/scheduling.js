const axios = require("axios"); // axios is a library that allows us to make HTTP requests
const C = require("./constants-demo");

const {
  getHeaders,
  getReqUrl,
  DEFAULT_DEPT_ID,
  DEFAULT_ECOUNTER_ID,
  DEFAULT_PATIENT_ID,
  DEFAULT_PRACTICE_ID,
  DEFAULT_PRACTITIONER_ID,
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

async function AppointmentInfo(
  patientId,
  deptId,
  practiceId,
  practitionerId,
  datasource
) {
  try {
    const requestUrl = `${getReqUrl()}Appointment?practitioner=Practitioner/${practitionerId}&practiceId=${practiceId}&departmentId=${deptId}`;

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

async function getSchedule({
  patientId = DEFAULT_PATIENT_ID,
  practiceId = DEFAULT_PRACTICE_ID,
  deptId = DEFAULT_DEPT_ID,
  encounterId = DEFAULT_ECOUNTER_ID,
  practitionerId = DEFAULT_PRACTITIONER_ID,
  datasource = "athena",
}) {
  try {
    const patientRes = await getPatient(patientId, practiceId, datasource);
    const AppointmentInfoRes = await AppointmentInfo(
      patientId,
      deptId,
      practiceId,
      practitionerId,
      datasource
    );
    const visitRes = await getVisit(patientId, deptId, datasource);
    const diagnosisRes = await getDiagnosis(patientId, encounterId, datasource);

    const response = {
      patientId,
      practiceId,
      encounterId,
      practitionerId,
      datasource,
      patient: patientRes,
      AppointmentInfo: AppointmentInfoRes,
      visit: visitRes,
      ConsultingProvider: "Not Presented",
      ReferringProvider: "Not Presented",
      VisitProvider: "Not Presented",
      diagnosis: diagnosisRes,
    };

    console.log("success");

    return response;
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  getSchedule,
};
