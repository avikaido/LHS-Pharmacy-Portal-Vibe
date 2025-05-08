import React, { useEffect, useMemo } from 'react';
import { List } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import {
  SelectPatient,
  fetchPatients,
  DeletePatient,
  toggleStarredPatient,
} from '../../../store/apps/patients/PatientSlice';

import Scrollbar from 'src/components/custom-scroll/Scrollbar';
import PatientListItem from './PatientListItem';

const PatientList = ({ showrightSidebar }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchPatients());
  }, [dispatch]);

  const getVisiblePatients = useMemo(() => {
    return (patients, filter, patientSearch) => {
      switch (filter) {
        case 'show_all':
          return patients.filter((p) =>
            p && // ensure p is not null
            !p.deleted &&
            ((p.first_name?.toLowerCase() || '').includes(patientSearch.toLowerCase()) ||
            (p.last_name?.toLowerCase() || '').includes(patientSearch.toLowerCase()))
          );

        case 'frequent_patient':
          return patients.filter(
            (p) =>
              !p.deleted &&
              p.frequentlycontacted &&
              ((p.first_name?.toLowerCase() || '').includes(patientSearch.toLowerCase()) ||
              (p.last_name?.toLowerCase() || '').includes(patientSearch.toLowerCase()))
          );

        case 'starred_patient':
          return patients.filter(
            (p) => 
              !p.deleted && 
              p.starred && 
              ((p.first_name?.toLowerCase() || '').includes(patientSearch.toLowerCase()) ||
              (p.last_name?.toLowerCase() || '').includes(patientSearch.toLowerCase()))
          );

        case 'new_patient':
          return patients.filter(
            (p) =>
              !p.deleted &&
              p.ecname &&
              ((p.first_name?.toLowerCase() || '').includes(patientSearch.toLowerCase()) ||
              (p.last_name?.toLowerCase() || '').includes(patientSearch.toLowerCase()))
          );

        case 'repeat_patient':
          return patients.filter(
            (p) =>
              !p.deleted &&
              p.requests && p.requests.length > 0 &&
              ((p.first_name?.toLowerCase() || '').includes(patientSearch.toLowerCase()) ||
              (p.last_name?.toLowerCase() || '').includes(patientSearch.toLowerCase()))
          );

        case 'older_patient':
          return patients.filter(
            (p) =>
              !p.deleted &&
              p.requests && p.requests.length > 0 &&
              ((p.first_name?.toLowerCase() || '').includes(patientSearch.toLowerCase()) ||
              (p.last_name?.toLowerCase() || '').includes(patientSearch.toLowerCase()))
          );

        default:
          throw new Error(`Unknown filter: ${filter}`);
      }
    };
  }, []);

  const patients = useSelector((state) =>
    getVisiblePatients(
      state.patientsReducer.patients,
      state.patientsReducer.currentFilter,
      state.patientsReducer.patientSearch,
    ),
  );

  const active = useSelector((state) => state.patientsReducer.patientContent);

  return (
    <List>
      <Scrollbar sx={{ height: 'calc(100vh - 200px)', maxHeight: 'none' }}>
        {patients.map((patient) => (
          <PatientListItem
            key={patient.id}
            active={patient.id === active}
            {...patient}
            onPatientClick={() => {
              dispatch(SelectPatient(patient.id));
              showrightSidebar();
            }}
            onDeleteClick={() => dispatch(DeletePatient(patient.id))}
            onStarredClick={() => dispatch(toggleStarredPatient(patient.id))}
          />
        ))}
      </Scrollbar>
    </List>
  );
};

export default PatientList;
