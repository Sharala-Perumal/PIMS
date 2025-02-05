import {
  FastDatePicker,
  FastFiscalYearInput,
  Input,
  ParentSelect,
  TextArea,
} from 'components/common/form';
import { Label } from 'components/common/Label';
import { Col, Row } from 'components/flex';
import { useFormikContext } from 'formik';
import React from 'react';
import { LookupType, useLookups } from 'store/hooks';

import { IProjectForm } from '../interfaces';
import * as styled from './styled';

interface IProjectInformationProps {
  disabled?: boolean;
}

export const ProjectInformation: React.FC<IProjectInformationProps> = ({ disabled = false }) => {
  const formik = useFormikContext<IProjectForm>();
  const { controller } = useLookups();

  const agencies = controller.getOptionsWithParents(LookupType.Agency);

  return (
    <styled.ProjectInformation className="project-details">
      <Row>
        <Col>
          <Label>Project No.</Label>
          <Input field="projectNumber" disabled={true} />
          <Label>Name</Label>
          <Input field="name" required disabled={disabled} />
          <ParentSelect
            label="Project Agency"
            field="agencyId"
            options={agencies}
            filterBy={['code', 'label', 'parent']}
            convertValue={Number}
            required
            disabled={disabled}
          />
        </Col>
        <Col style={{ height: '50px' }}>
          <Label>Description</Label>
          <TextArea field="description" disabled={disabled} />
        </Col>
      </Row>
      <Row>
        <Col>
          <FastDatePicker
            label="Project Approved On"
            field="approvedOn"
            formikProps={formik}
            required
            disabled={disabled}
          />
          <FastFiscalYearInput
            label="Reported Fiscal Year"
            field="reportedFiscalYear"
            formikProps={formik}
            required
            disabled={disabled}
          />
        </Col>
        <Col>
          <Label>Manager Name</Label>
          <Input field="manager" />
          <FastFiscalYearInput
            label="Actual or Forecasted Fiscal Year of Sale"
            field="actualFiscalYear"
            formikProps={formik}
            required
          />
        </Col>
      </Row>
    </styled.ProjectInformation>
  );
};
