import climat_report_dashboard_img from '../assets/Images/climat_report_dashboard_img.svg'
import climat_carbon_img from '../assets/Images/climat_carbon_img.svg'
import climat_report_marketplace_img from '../assets/Images/climat_report_marketplace_img.svg'
import { pathNames } from '../routes/pathNames'

export const CARBON_SERVICES = [
  {
    serviceImg: climat_report_dashboard_img,
    serviceName: 'Climat.Report',
    serviceDesc: 'Carbon Accounting & Reporting for Organisations',
    serviceLink: 'https://greendev.shinetrace.com/login',
    existInApp: false,
    serviceValue: 'report',
  },
  {
    serviceImg: climat_report_marketplace_img,
    serviceName: 'Climat.Carbon Marketplace',
    serviceDesc: 'Carbon Credit Marketplace for Organisations',
    serviceLink: pathNames.PROJECT_LISTS_WITH_FILTER,
    existInApp: true,
    serviceValue: 'marketPlace',
  },
  {
    serviceImg: climat_carbon_img,
    serviceName: 'Climat.Carbon',
    serviceDesc: 'Carbon Credit Platform for Project Developers',
    serviceLink: pathNames.DASHBOARD,
    existInApp: true,
    serviceValue: 'carbon',
  },
]
