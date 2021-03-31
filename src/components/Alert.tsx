import React from 'react';
import { Alert as MUAlert, AlertProps } from '@material-ui/lab';
import { SvgIcon } from '@material-ui/core';
import icons from '../config/icons';

export default function Alert(props: AlertProps) {
  return (
    <MUAlert
      iconMapping={{
        success: <SvgIcon fontSize="inherit">{icons.checkCircle}</SvgIcon>,
        error: <SvgIcon fontSize="inherit">{icons.exclamationCircle}</SvgIcon>,
        info: <SvgIcon fontSize="inherit">{icons.informationCircle}</SvgIcon>,
        warning: <SvgIcon fontSize="inherit">{icons.exclamation}</SvgIcon>,
      }}
      {...props}
    />
  );
}
