import React, { useEffect } from 'react';
import {
  Grid,
  Typography,
  Box,
  TextField,
  Container,
  Card,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Stack,
} from '@mui/material';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { FaAngleDoubleRight, FaImage, FaFileVideo , FaAngleDoubleLeft } from 'react-icons/fa';
import useEventData from '../../hooks/useEventData';
import { addCampaignData, deleteCampaignData } from '../../redux/slice/totalDigitalCampaignSlice';
import {
  addResultTableData,
  deleteResTabImageData,
  deleteResTabDgCampaignData,
  addResultTableDatasToDb,
  updateResultTableDatasToDb,
} from '../../redux/slice/resultTableDataSlice';
import { addImageData, deleteImageData } from '../../redux/slice/imageSlice';
import { IconDiv } from '../../components/IconDiv';
import ImageIcon from '../../assets/Image.png';


// import { useTheme } from '@mui/material/styles'
const Image = (props) => {
  const { setValue, value } = props;
  const allData = useSelector((state) => state?.totalImageDetails?.data?.[0]?.data);
  const totalEmission = useSelector((state) => state?.totalImageDetails?.totalEmission);
  const resultTableData = useSelector((state) => state?.resultTableDataDetails);
  // const { pageSizeMB, loading, error } = useSelector((state) => state.totalGreenCheckDetails);
  const eventsData = useEventData();
  const dispatch = useDispatch();
  const initialValues = {
    wifiImpression: '',
    wifi4GImpression: '',
    wifi5GImpression: '',
    wifiTotalEmissions: '',
    contentSize: '',
    mobileDevice: '',
    mobileDeviceEmissions: '',
    EFMobile1: 0.003333,
    EFMobile3: 0.8552,
    tabletDevice: '',
    tabletDeviceEmissions: '',
    tabletEF1: 0.01875,
    tabletEF3: 0.8552,
    laptopDevice: '',
    laptopDeviceEmissions: '',
    laptopEF1: 0.041667,
    laptopEF3: 0.8552,
    desktopDevice: '',
    desktopDeviceEmissions: '',
    desktopEF1: 0.291666,
    desktopEF3: 0.8552,

    dataCenter: '',
    dataRenewable: '',
    dataEmissions: '',
  };
  const formik = useFormik({
    initialValues,
    onSubmit: async (values) => {
      const wifiEF2 = Number(values?.wifiImpression) * 0.0000017 * values?.contentSize;
      const wifiEF4 = Number(values?.wifi4GImpression) * 0.00000189 * values?.contentSize;
      const wifiEF6 = Number(values?.wifi5GImpression) * 0.000000189 * values?.contentSize;
      const wifiTotalEF = wifiEF2 + wifiEF4 + wifiEF6;
      const wifiTotalEmissions = Number(wifiTotalEF * 0.8552).toFixed(5);

      const EFMobile2 = Number(values?.mobileDevice) * values?.EFMobile1;
      const mobileDeviceEmissions = (EFMobile2 * values?.EFMobile3).toFixed(5);
      const tabletEF2 = Number(values?.tabletDevice) * values?.tabletEF1;
      const tabletDeviceEmissions = (tabletEF2 * values?.tabletEF3).toFixed(5);
      const laptopEF2 = Number(values?.laptopDevice) * values?.laptopEF1;
      const laptopDeviceEmissions = (laptopEF2 * values?.laptopEF3).toFixed(5);
      const desktopEF2 = Number(values?.desktopDevice) * values?.desktopEF1;
      const desktopDeviceEmissions = (desktopEF2 * values?.desktopEF3).toFixed(5);

      const dataEf1 = (Number(values?.dataCenter) * values?.contentSize) / 1024;

      const dataEF3 = dataEf1 * 0.3;
      const dataEF4 = dataEF3 * 1.7;
      const renewableValue = 100 - values?.dataRenewable;
      const dataTotalEF = (dataEF4 * renewableValue) / 100;
      const dataEmissions = (dataTotalEF * 0.4).toFixed(5);

      if (wifiTotalEmissions > 0) formik.setFieldValue('wifiTotalEmissions', wifiTotalEmissions);
      if (dataEmissions > 0) {
        formik.setFieldValue('dataEmissions', dataEmissions || 0);
      } else {
        formik.setFieldValue('dataEmissions', dataEmissions);
      }
      if (mobileDeviceEmissions > 0) formik.setFieldValue('mobileDeviceEmissions', mobileDeviceEmissions);
      if (tabletDeviceEmissions > 0) formik.setFieldValue('tabletDeviceEmissions', tabletDeviceEmissions);
      if (laptopDeviceEmissions > 0) formik.setFieldValue('laptopDeviceEmissions', laptopDeviceEmissions);
      if (desktopDeviceEmissions > 0) formik.setFieldValue('desktopDeviceEmissions', desktopDeviceEmissions);

      const data = [
        {
          type: 'Network Emissions',
          wifi: values?.wifiImpression,
          wifi4g: values?.wifi4GImpression,
          wifi5g: values?.wifi5GImpression,
          emission: Number(wifiTotalEmissions) > 0 ? Number(wifiTotalEmissions) : '',
        },
        {
          type: 'Device Emissions',
          mobile: values?.mobileDevice,
          mobileEmission: Number(mobileDeviceEmissions) > 0 ? Number(mobileDeviceEmissions) : '',
          tablet: values?.tabletDevice,
          tabletEmission: Number(tabletDeviceEmissions) > 0 ? Number(tabletDeviceEmissions) : '',
          laptop: values?.laptopDevice,
          laptopEmission: Number(laptopDeviceEmissions) > 0 ? Number(laptopDeviceEmissions) : '',
          desktop: values?.desktopDevice,
          desktopEmission: Number(desktopDeviceEmissions) > 0 ? Number(desktopDeviceEmissions) : '',
        },
        {
          type: 'Data Center Emissions',
          dataCenter: values?.dataCenter,
          renewable: values?.dataRenewable,
          emission: Number(dataEmissions),
        },
        {
          type: 'Content Size',
          contentSize: values?.contentSize,
        },
      ];
      dispatch(addImageData({ data }));

      const tableData = [
        {
          subType: 'Content Size (Mb)',
          subTypeData: {
            th: ['contentSize'],
            td: [{ contentSize: values?.contentSize }],
          },
        },
        {
          subType: 'Network Emissions',
          subTypeData: {
            th: ['Wi-Fi Impressions', '4G Impressions', '5G Impressions', 'Emissions'],
            td: [
              {
                // dgType: values?.wifiImpression,
                wifiImpression: values?.wifiImpression,
                wifi4g: values?.wifi4GImpression,
                wifi5g: values?.wifi5GImpression,
                emissions: wifiTotalEmissions > 0 ? Number(wifiTotalEmissions).toFixed(5) : '',
              },
            ],
          },
        },
        {
          subType: 'Device Emissions',
          subTypeData: {
            th: ['Device Type', 'No. of Devices', 'Emissions'],
            td: [
              {
                dgType: 'Mobile',
                noOfDevice: values?.mobileDevice,
                emissions: mobileDeviceEmissions > 0 ? Number(mobileDeviceEmissions).toFixed(5) : '',
              },
              {
                dgType: 'Tablet',
                noOfDevice: values?.tabletDevice,
                emissions: tabletDeviceEmissions > 0 ? Number(tabletDeviceEmissions).toFixed(5) : '',
              },
              {
                dgType: 'Laptop',
                noOfDevice: values?.laptopDevice,
                emissions: laptopDeviceEmissions > 0 ? Number(laptopDeviceEmissions).toFixed(5) : '',
              },
              {
                dgType: 'Desktop',
                noOfDevice: values?.desktopDevice,
                emissions: desktopDeviceEmissions > 0 ? Number(desktopDeviceEmissions).toFixed(5) : '',
              },
            ],
          },
        },
        {
          subType: 'Data Center Emissions',
          subTypeData: {
            th: ['Total Impressions', '% of Renewable Energy', 'Emissions'],
            td: [
              {
                // dgType: values?.dataCenter,
                dataCenter: values?.dataCenter,
                noOfData: values?.dataRenewable,
                emissions: Number(dataEmissions).toFixed(5),
              },
            ],
          },
        },
      ];

      dispatch(addResultTableData({ from: 'digitalCampaign', data: tableData, tabTitle: 'Image' }));
    },
  });

  const handeleDelete = () => {
    dispatch(deleteImageData());
    dispatch(deleteResTabImageData());
  };

  const handleSaveToDb = async (values) => {
    const eventData = {
      ...eventsData,
    };
    if (resultTableData.eventDataId) {
      eventData.eventDataId = resultTableData?.eventDataId;
      const resultAction = await dispatch(updateResultTableDatasToDb(eventData));
      if (updateResultTableDatasToDb?.rejected?.match(resultAction)) {
        console.error('Failed to update data:', resultAction?.payload);
      }
    } else {
      const resultAction = await dispatch(addResultTableDatasToDb(eventData));
      if (addResultTableDatasToDb?.rejected?.match(resultAction)) {
        console.error('Failed to save data:', resultAction?.payload);
      }
    }
  };
  const totalDevice =
    (Number(formik?.values?.mobileDeviceEmissions) || 0) +
    (Number(formik?.values?.tabletDeviceEmissions) || 0) +
    (Number(formik?.values?.laptopDeviceEmissions) || 0) +
    (Number(formik?.values?.desktopDeviceEmissions) || 0);
  const ImageTotalEmissions =
    (Number(formik.values.wifiTotalEmissions) || 0) +
    (Number(totalDevice) || 0) +
    (Number(formik?.values?.dataEmissions) || 0);

  useEffect(() => {
    if (allData?.length > 0) {
      formik.setFieldValue('contentSize', allData?.[3]?.contentSize);

      formik.setFieldValue('wifiImpression', allData?.[0]?.wifi);
      formik.setFieldValue('wifi4GImpression', allData?.[0]?.wifi4g);
      formik.setFieldValue('wifi5GImpression', allData?.[0]?.wifi5g);
      formik.setFieldValue('wifiTotalEmissions', allData?.[0]?.emission);

      formik.setFieldValue('mobileDevice', allData?.[1]?.mobile);
      formik.setFieldValue('mobileDeviceEmissions', allData?.[1]?.mobileEmission);
      formik.setFieldValue('tabletDevice', allData?.[1]?.tablet);
      formik.setFieldValue('tabletDeviceEmissions', allData?.[1]?.tabletEmission);
      formik.setFieldValue('laptopDevice', allData?.[1]?.laptop);
      formik.setFieldValue('laptopDeviceEmissions', allData?.[1]?.laptopEmission);
      formik.setFieldValue('desktopDevice', allData?.[1]?.desktop);
      formik.setFieldValue('desktopDeviceEmissions', allData?.[1]?.desktopEmission);

      formik.setFieldValue('dataCenter', allData?.[2]?.dataCenter);
      formik.setFieldValue('dataRenewable', allData?.[2]?.renewable);
      formik.setFieldValue('dataEmissions', allData?.[2]?.emission);
    }
  }, [value]);

  // useEffect(() => {
  //   if (pageSizeMB) {
  //     formik.setFieldValue('contentSize', pageSizeMB);
  //   }
  // }, [pageSizeMB]);

  return (
    <Container maxWidth>
      <Card className="p-3 custom-inner-bg textborder" style={{ padding: '20px' }}>
      <IconDiv>
                          <img width={100} src={ImageIcon} alt="Ads" className="tabImgWhite" />
                        </IconDiv>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={12} display={'flex'} justifyContent={'center'}>
            <Box>
              {/* <Grid sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                <Typography variant="h4" className="text-center text-white mb-2">
                  Content Size (Mb)
                </Typography>
                <TextField
                  size="small"
                  type="number"
                  name="contentSize"
                  sx={{ width: '300px' }}
                  value={formik.values.contentSize}
                  onChange={(e) => {
                    const value = e.target.value;
                    formik.setFieldValue('contentSize', value);

                    const wifiEF2 = Number(formik.values.wifiImpression || 0) * 0.0000017 * value;
                    const wifiEF4 = Number(formik.values.wifi4GImpression || 0) * 0.00000189 * value;
                    const wifiEF6 = Number(formik.values.wifi5GImpression || 0) * 0.000000189 * value;
                    const wifiTotalEmissions = ((wifiEF2 + wifiEF4 + wifiEF6) * 0.8552).toFixed(5);

                    formik.setFieldValue('wifiTotalEmissions', wifiTotalEmissions);
                    formik.handleSubmit();
                  }}
                  inputProps={{ style: { color: 'white' } }}
                />
              </Grid> */}

              <Grid item xs={12} sm={12} md={12} display={'flex'} justifyContent={'center'} marginTop={3}>
                <Box>
                  <div className="table-responsive">
                    <table className="table-custom-inpt-field">
                      <tr>
                        <td className="ps-3">Content Size (Mb)</td>
                        <td className="ps-3 ">Total Impressions</td>
                        {/* <td className="ps-3">Emissions</td> */}
                      </tr>
                      <tr>
                        <td className="ps-3 py-1">
                          {/* <TextField
                                                              size="small"
                                                              name="TotalImpression"
                                                              // label="Enter Website URL"
                                                              fullWidth
                                                              // onChange={formik.handleChange}
                                                              onChange={(e) => {
                                                                  const value = e.target.value;
                                                                  formik.setFieldValue('TotalImpression', value);
              
                                                              }}
                                                              value={formik.values.TotalImpression}
                                                              inputProps={{ style: { color: 'white' } }}
                                                              sx={{ mt: 2 }}
                                                          /> */}
                          <TextField
                            size="small"
                            type="number"
                            name="contentSize"
                            value={formik.values.contentSize}
                            onChange={(e) => {
                              const value = e.target.value;
                              formik.setFieldValue('contentSize', value);

                              const wifiEF2 = Number(formik.values.wifiImpression || 0) * 0.0000017 * value;
                              const wifiEF4 = Number(formik.values.wifi4GImpression || 0) * 0.00000189 * value;
                              const wifiEF6 = Number(formik.values.wifi5GImpression || 0) * 0.000000189 * value;
                              const wifiTotalEmissions = ((wifiEF2 + wifiEF4 + wifiEF6) * 0.8552).toFixed(5);

                              formik.setFieldValue('wifiTotalEmissions', wifiTotalEmissions);
                              formik.handleSubmit();
                            }}
                            inputProps={{ style: { color: 'white' } }}
                          />
                        </td>
                        <td className="ps-3 py-1">
                          <TextField
                            size="small"
                            type="number"
                            name="dataCenter"
                            value={formik.values.dataCenter}
                            onChange={(e) => {
                              formik.handleChange(e);

                              const dataCenter = Number(e.target.value) || 0;
                              const dataRenewable = Number(formik.values.dataRenewable) || 0;
                              const pageSizeMB = formik.values.pageSizeMB;

                              // Calculation Logic
                              const dataEf1 = (dataCenter * pageSizeMB) / 1024;
                              const dataEF3 = dataEf1 * 0.3;
                              const dataEF4 = dataEF3 * 1.7;
                              const renewableValue = 100 - dataRenewable;
                              const dataTotalEF = (dataEF4 * renewableValue) / 100;
                              const dataEmissions = dataTotalEF * 0.4;

                              // Update field value
                              formik.setFieldValue('dataEmissions', dataEmissions.toFixed(5));
                              formik.handleSubmit();
                            }}
                            inputProps={{ style: { color: 'white' } }}
                          />
                        </td>
                      </tr>
                    </table>
                  </div>
                </Box>
              </Grid>

              <Typography variant="h4" className="text-center text-white mb-4 mt-4">
                Network Emissions
              </Typography>
              <div className="table-responsive">
                <table className="table-custom-inpt-field">
                  <tr>
                    <td className="ps-3">Wi-Fi Impressions</td>
                    <td className="ps-3">4G Impressions</td>
                    <td className="ps-3">5G Impressions</td>
                    <td className="ps-3">
                      Emissions (kgCO<sub>2</sub>e)
                    </td>
                  </tr>
                  <tr>
                    <td className="ps-3 py-1">
                      <TextField
                        size="small"
                        type="number"
                        name="wifiImpression"
                        value={formik.values.wifiImpression}
                        onChange={(e) => {
                          const value = e.target.value;
                          formik.setFieldValue('wifiImpression', value);

                          const wifiEF2 = Number(value) * 0.0000017 * formik.values.contentSize;
                          const wifiEF4 =
                            Number(formik.values.wifi4GImpression || 0) * 0.00000189 * formik.values.contentSize;
                          const wifiEF6 =
                            Number(formik.values.wifi5GImpression || 0) * 0.000000189 * formik.values.contentSize;
                          const wifiTotalEmissions = ((wifiEF2 + wifiEF4 + wifiEF6) * 0.8552).toFixed(5);

                          formik.setFieldValue('wifiTotalEmissions', wifiTotalEmissions);
                          formik.handleSubmit();
                        }}
                        inputProps={{ style: { color: 'white' } }}
                      />
                    </td>
                    <td className="ps-3 py-1">
                      <TextField
                        size="small"
                        type="number"
                        name="wifi4GImpression"
                        value={formik.values.wifi4GImpression}
                        onChange={(e) => {
                          const value = e.target.value;
                          formik.setFieldValue('wifi4GImpression', value);

                          const wifiEF2 =
                            Number(formik.values.wifiImpression || 0) * 0.0000017 * formik.values.contentSize;
                          const wifiEF4 = Number(value) * 0.00000189 * formik.values.contentSize;
                          const wifiEF6 =
                            Number(formik.values.wifi5GImpression || 0) * 0.000000189 * formik.values.contentSize;
                          const wifiTotalEmissions = ((wifiEF2 + wifiEF4 + wifiEF6) * 0.8552).toFixed(5);

                          formik.setFieldValue('wifiTotalEmissions', wifiTotalEmissions);
                          formik.handleSubmit();
                        }}
                        inputProps={{ style: { color: 'white' } }}
                      />
                    </td>
                    <td className="ps-3 py-1">
                      <TextField
                        size="small"
                        type="number"
                        name="wifi5GImpression"
                        value={formik.values.wifi5GImpression}
                        onChange={(e) => {
                          const value = e.target.value;
                          formik.setFieldValue('wifi5GImpression', value);

                          const wifiEF2 =
                            Number(formik.values.wifiImpression || 0) * 0.0000017 * formik.values.contentSize;
                          const wifiEF4 =
                            Number(formik.values.wifi4GImpression || 0) * 0.00000189 * formik.values.contentSize;
                          const wifiEF6 = Number(value) * 0.000000189 * formik.values.contentSize;
                          const wifiTotalEmissions = ((wifiEF2 + wifiEF4 + wifiEF6) * 0.8552).toFixed(5);

                          formik.setFieldValue('wifiTotalEmissions', wifiTotalEmissions);
                          formik.handleSubmit();
                        }}
                        inputProps={{ style: { color: 'white' } }}
                      />
                    </td>
                    <td className="ps-3 py-1">
                      <TextField
                        size="small"
                        type="number"
                        name="wifiTotalEmissions"
                        value={formik.values.wifiTotalEmissions}
                        disabled
                        inputProps={{ style: { color: 'white' } }}
                      />
                    </td>
                  </tr>
                </table>
              </div>
            </Box>
          </Grid>

          <Grid item xs={12} sm={12} md={12} display={'flex'} justifyContent={'center'}>
            <Box>
              <Typography variant="h4" className="text-center text-white mb-4 mt-3">
                Device Emissions
              </Typography>
              <div className="table-responsive">
                <table className="table-custom-inpt-field">
                  <tr>
                    <th className="ps-2">Device Type </th>
                    <th className="ps-2" style={{ textAlign: 'center' }}>
                      No. of Devices
                    </th>
                    <th className="ps-2" style={{ textAlign: 'center' }}>
                      Emissions (kgCO<sub>2</sub>e)
                    </th>
                  </tr>
                  <tr>
                    <td className="ps-2 py-1">Mobile</td>
                    <td className="ps-2 py-1">
                      <TextField
                        size="small"
                        type="number"
                        name="mobileDevice"
                        value={formik?.values?.mobileDevice}
                        onChange={(e) => {
                          formik.handleChange(e);
                          formik.setFieldValue(
                            'mobileDeviceEmissions',
                            (Number(e?.target?.value) * formik?.values?.EFMobile1 * formik?.values?.EFMobile3).toFixed(
                              2
                            )
                          );
                          formik.handleSubmit();
                        }}
                        inputProps={{ style: { color: 'white' } }}
                      />
                    </td>
                    <td className="ps-2 py-1">
                      <TextField
                        size="small"
                        type="number"
                        disabled
                        name="mobileDeviceEmissions"
                        value={formik?.values?.mobileDeviceEmissions}
                        onChange={formik.handleChange}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className="ps-2 py-1">Tablet</td>
                    <td className="ps-2 py-1">
                      <TextField
                        size="small"
                        type="number"
                        name="tabletDevice"
                        value={formik?.values?.tabletDevice}
                        onChange={(e) => {
                          formik.handleChange(e);
                          formik.setFieldValue(
                            'tabletDeviceEmissions',
                            (Number(e?.target?.value) * formik?.values?.tabletEF1 * formik?.values?.tabletEF3).toFixed(
                              2
                            )
                          );
                          formik.handleSubmit();
                        }}
                        inputProps={{ style: { color: 'white' } }}
                      />
                    </td>
                    <td className="ps-2 py-1">
                      <TextField
                        size="small"
                        type="number"
                        disabled
                        name="tabletDeviceEmissions"
                        value={formik?.values?.tabletDeviceEmissions}
                        onChange={formik.handleChange}
                      />
                    </td>
                  </tr>

                  <tr>
                    <td className="ps-2 py-1">Laptop</td>
                    <td className="ps-2 py-1">
                      <TextField
                        size="small"
                        type="number"
                        name="laptopDevice"
                        value={formik?.values?.laptopDevice}
                        onChange={(e) => {
                          formik.handleChange(e);
                          formik.setFieldValue(
                            'laptopDeviceEmissions',
                            (Number(e?.target?.value) * formik?.values?.laptopEF1 * formik?.values?.laptopEF3).toFixed(
                              2
                            )
                          );
                          formik.handleSubmit();
                        }}
                        inputProps={{ style: { color: 'white' } }}
                      />
                    </td>
                    <td className="ps-2 py-1">
                      <TextField
                        size="small"
                        type="number"
                        disabled
                        name="laptopDeviceEmissions"
                        value={formik?.values?.laptopDeviceEmissions}
                        onChange={formik.handleChange}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className="ps-2 py-1">Desktop</td>
                    <td className="ps-2 py-1">
                      <TextField
                        size="small"
                        type="number"
                        name="desktopDevice"
                        value={formik?.values?.desktopDevice}
                        onChange={(e) => {
                          formik.handleChange(e);
                          formik.setFieldValue(
                            'desktopDeviceEmissions',
                            (
                              Number(e?.target?.value) *
                              formik?.values?.desktopEF1 *
                              formik?.values?.desktopEF3
                            ).toFixed(5)
                          );
                          formik.handleSubmit();
                        }}
                        inputProps={{ style: { color: 'white' } }}
                      />
                    </td>
                    <td className="ps-2 py-1">
                      <TextField
                        size="small"
                        type="number"
                        disabled
                        name="desktopDeviceEmissions"
                        value={formik?.values?.desktopDeviceEmissions}
                        onChange={formik.handleChange}
                      />
                    </td>
                  </tr>
                  {/* <tr>
                    <td className="ps-2">Total</td>
                    <td />
                    <td style={{ textAlign: 'right' }}>{Number(totalDevice).toFixed(5)}</td>
                  </tr> */}
                </table>
              </div>
            </Box>
          </Grid>

          <Grid item xs={12} sm={12} md={12} display={'flex'} justifyContent={'center'}>
            <Box>
              <Typography variant="h4" className="text-center text-white mb-4 mt-3">
                Data Center Emissions
              </Typography>
              <div className="table-responsive">
                <table className="table-custom-inpt-field">
                  <tr>
                    <td className="ps-3 invisible">Device Type</td>
                    {/* <td className="ps-3">Total Impressions</td> */}
                    <td className="ps-3">% of Renewable Energy</td>
                    <td className="ps-3">
                      Emissions (kgCO<sub>2</sub>e)
                    </td>
                  </tr>
                  <tr>
                    <td className="ps-3 py-1" />
                    {/* <td className="ps-3 py-1">
                      <TextField
                        size="small"
                        type="number"
                        name="dataCenter"
                        value={formik.values.dataCenter}
                        onChange={(e) => {
                          formik.handleChange(e);

                          const dataCenter = Number(e.target.value) || 0;
                          const dataRenewable = Number(formik.values.dataRenewable) || 0;
                          const contentSize = formik.values.contentSize;

                          // Calculation Logic
                          const dataEf1 = (dataCenter * contentSize) / 1024;
                          const dataEF3 = dataEf1 * 0.3;
                          const dataEF4 = dataEF3 * 1.7;
                          const renewableValue = 100 - dataRenewable;
                          const dataTotalEF = (dataEF4 * renewableValue) / 100;
                          const dataEmissions = dataTotalEF * 0.4;

                          // Update field value
                          formik.setFieldValue('dataEmissions', dataEmissions.toFixed(5));
                          formik.handleSubmit();
                        }}
                        inputProps={{ style: { color: 'white' } }}
                      />
                    </td> */}
                    <td className="ps-3 py-1">
                      <TextField
                        size="small"
                        type="number"
                        name="dataRenewable"
                        value={formik.values.dataRenewable}
                        onChange={(e) => {
                          formik.handleChange(e);

                          const dataRenewable = Number(e.target.value) || 0;
                          const dataCenter = Number(formik.values.dataCenter) || 0;
                          const contentSize = formik.values.contentSize; // Default value to avoid NaN

                          // Calculation Logic
                          const dataEf1 = (dataCenter * contentSize) / 1024;
                          const dataEF3 = dataEf1 * 0.3;
                          const dataEF4 = dataEF3 * 1.7;
                          const renewableValue = 100 - dataRenewable;
                          const dataTotalEF = (dataEF4 * renewableValue) / 100;
                          const dataEmissions = dataTotalEF * 0.4;

                          // Update field value
                          formik.setFieldValue('dataEmissions', dataEmissions.toFixed(5));
                          formik.handleSubmit();
                        }}
                        inputProps={{ style: { color: 'white' } }}
                      />
                    </td>
                    <td className="ps-3 py-1">
                      <TextField
                        size="small"
                        type="number"
                        name="dataEmissions"
                        value={formik.values.dataEmissions}
                        disabled
                        inputProps={{ style: { color: 'white' } }}
                      />
                    </td>
                  </tr>
                </table>
              </div>
            </Box>
          </Grid>

          <Grid item xs={12} sm={12} md={12} display={'flex'} justifyContent={'center'}>
            <Box>
              <Typography variant="h4" className="text-center text-white mb-4 mt-3">
                Total Emissions
              </Typography>
              <TableContainer component={Paper} sx={{ backgroundColor: 'transparent' }}>
                <Table sx={{ minWidth: 400 }} aria-label="total emissions table">
                  <TableHead sx={{ backgroundColor: 'transparent' }}>
                    <TableRow>
                      <TableCell
                        sx={{
                          fontWeight: 'bold',
                          color: 'white',
                          backgroundColor: 'transparent',
                          visibility: 'hidden',
                          borderBottom: 'none',
                        }}
                      >
                        Emissions Source
                      </TableCell>
                      <TableCell
                        sx={{
                          fontWeight: 'bold',
                          color: 'white',
                          backgroundColor: 'transparent',
                          borderBottom: 'none',
                        }}
                      >
                        Emissions (kgCO<sub>2</sub>e)
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody sx={{ borderBottom: 'none' }}>
                    <TableRow>
                      <TableCell sx={{ color: 'white', borderBottom: 'none' }}>Network</TableCell>
                      <TableCell sx={{ color: 'white', borderBottom: 'none' }}>
                        {Number(formik.values.wifiTotalEmissions || 0).toFixed(5)}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell sx={{ color: 'white', borderBottom: 'none' }}>Device</TableCell>
                      <TableCell sx={{ color: 'white', borderBottom: 'none' }}>
                        {Number(totalDevice || 0).toFixed(5)}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell sx={{ color: 'white', borderBottom: 'none' }}>Data Center</TableCell>
                      <TableCell sx={{ color: 'white', borderBottom: 'none' }}>
                        {Number(formik.values.dataEmissions || 0).toFixed(5)}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 'bold', color: 'white', borderBottom: 'none' }}>
                        Total Emissions
                      </TableCell>
                      <TableCell sx={{ fontWeight: 'bold', color: 'white', borderBottom: 'none' }}>
                        {Number(ImageTotalEmissions || 0).toFixed(5)}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          </Grid>
        </Grid>
        <Grid>
          <Grid item xs={12} sm={12} md={12} display={'flex'} justifyContent={'center'} mt={2}>
            <Stack direction={'row'} spacing={2}>
            <Button
                            variant="contained"
                            startIcon={<FaAngleDoubleLeft />}
                            onClick={() => {
                              handleSaveToDb(formik?.values);
                              // formik.handleSubmit();
                              setValue(value - 1);
                            }}
                            className="custom-btn"
                          >
                            Save and Previous Page
                          </Button>
              <Button
                variant="contained"
                endIcon={<FaAngleDoubleRight />}
                type="submit"
                onClick={() => {
                  handleSaveToDb();
                  setValue(value + 1);
                }}
                className="custom-btn"
              >
                Save and Next Page
              </Button>
              <Button
                                    variant="contained"
                                    endIcon={<FaAngleDoubleRight />}
                                    onClick={() => {
                                      handleSaveToDb();
                                      setValue(3);
                                    }}
                                    className="custom-btn"
                                  >
                                    Go To Result
                                  </Button>
              {/* <Button variant='contained' onClick={() => { handleSaveToDb(); }} className='custom-btn'>SaveToDB</Button> */}
              <Button
                variant="outlined"
                onClick={() => {
                  formik.resetForm();
                  handeleDelete();
                }}
                color="error"
              >
                Clear
              </Button>
            </Stack>
          </Grid>
          <Grid item xs={12} sm={12} md={12} marginTop={3}>
            <Typography color="white" className="text-center">
              {`Total Image Carbon Footprint = ${Number(totalEmission || 0).toFixed(5)} `}kgCO<sub>2</sub>e
            </Typography>
          </Grid>
        </Grid>
      </Card>
    </Container>
  );
};

export default Image;
