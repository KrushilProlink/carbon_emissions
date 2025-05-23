import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import { useTheme } from '@emotion/react';
import * as yup from 'yup';
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  Divider,
  Grid,
  TextField,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import posterImg from '../../../assets/images/Still Image for CEO Video.png';
import bannerVideo1 from '../../../assets/images/Home2.mp4';
import bannerVideo2 from '../../../assets/images/Home2.mov';
import ceoVideo1 from '../../../assets/images/CEO Video-Updates.mp4';
import ceoVideo2 from '../../../assets/images/CEO Video-Updates3.mov';
import tailored1 from '../../../assets/images/tailored1.png';
import tailored2 from '../../../assets/images/tailored2.png';
import tailored3 from '../../../assets/images/tailored3.png';
import Logo from '../../../assets/images/logo5.gif';
import { apipost } from '../../../../../service/api';
import TrustOne from '../../../assets/images/Aster CMI Logo.png';
import TrustTwo from '../../../assets/images/GoFig2.png';
import Hutch from '../../../assets/images/Hutch.png';
import OurCustomersBgImg2 from '../../../assets/images/OurCustomersBgImg2.jpg';
import home3 from '../../../assets/images/Home3.png';
import testimonial1 from '../../../assets/images/customerTestimonials1.jpg';
import testimonial2 from '../../../assets/images/customerTestimonials2.jpg';
import testimonial3 from '../../../assets/images/customerTestimonials3.jpg';

const Index = () => {
  const theme = useTheme();
  const [openCredit, setOpenCredit] = useState(false);
  const [isLoading, setLoading] = React.useState(false);
  const videoRef = useRef();

  const initialValues = {
    cName: '',
    name: '',
    email: '',
    message: '',
    mobile: '',
  };

  const validationSchema = yup.object({
    cName: yup.string().required('Company Name is required'),
    name: yup.string().required('Name is required'),
    email: yup.string().email('Email is invalid').required('Email is required'),
    mobile: yup.number().required('Mobile Number is required'),
    message: yup.string().required('Message is required'),
  });

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      const payload = {
        name: values.name,
        email: values.email,
        mobile: values.mobile,
        companyName: values.cName,
        message: `Company Name: ${values.cName} \n Contact Name: ${values.name} \n Contact EmailId: ${values.email} \n Contact Number: ${values.mobile} \n\n${values.message}`,
      };

      try {
        const result = await apipost('api/buyCredits/add', payload);

        if (result && (result.status === 200 || result.status === 201)) {
          formik.resetForm();
          handleClose();
        }
      } catch (error) {
        console.log('Error sending Buy Credits mail:', error);
      }
      setLoading(false);
    },
  });

  const { values, resetForm, errors, handleChange, handleSubmit } = formik;

  const handleClose = () => {
    setOpenCredit(false);
  };

  // useEffect(() => {
  //   videoRef.current.playbackRate = 0.5;
  // }, []);

  return (
    <div>
      <div style={{ maxHeight: '580px', overflow: 'hidden', position: 'relative' }}>
        {/* <video
          width="100%"
          height="100%"
          autoPlay
          muted
          preload
          ref={videoRef}
          loop
          playsInline
          controls
        > */}
        {/* <source src={"https://sirat.earth/static/media/Home2.69b541e3251c33325f07.mp4"} type={"video/mp4"} />
                    <source src={"https://sirat.earth/static/media/Home2.be01049ec23c63b9ce2d.mov"} type="video/mov" /> */}
        {/* <source src={"https://carbon-emissions-sigma.vercel.app/static/media/Home2.69b541e3251c33325f07.mp4"} type={"video/mp4"} />
                    <source src={"https://carbon-emissions-sigma.vercel.app/static/media/Home2.be01049ec23c63b9ce2d.mov"} type="video/mov" /> */}
        {/* <source src={'https://sirat.earth:8000/videos/Home2.mp4'} type={'video/mp4'} />
          <source src={'https://sirat.earth:8000/videos/Home2.mov'} type="video/mov" />
          <track kind="captions" src="captions.vtt" label="English" />
          Sorry, your browser doesn't support embedded videos, but don't worry, you can
          <a href="https://sirat.earth:8000/videos/Home2.mp4">download it</a>
          and watch it with your favorite video player!
        </video> */}

        <img
          src={home3}
          alt="Home Banner"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
          }}
        />

        <div
          className="ms-xl-1 ms-md-2 ms-sm-5 ps-4"
          style={{
            position: 'absolute',
            right: '10px',
            bottom: '8px',
            color: 'white',
            fontSize: useMediaQuery(theme.breakpoints.up('sm')) ? '30px' : '15px',
            fontWeight: '800',
          }}
        >
          <span>
            Enabling the <u>path</u> to NetZero
          </span>
        </div>
      </div>

      <Grid
        container
        rowSpacing={1}
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        className="setHome_padding"
        style={{ paddingTop: useMediaQuery(theme.breakpoints.up('md')) ? '45px' : '32px' }}
      >
        <Grid item sm={12} md={12} className="d-flex justify-content-center">
          <Typography
            className="fontFamily fs-3 fw-bold text-center wow animate__animated animate__fadeInLeft animate__slow pt-2 pb-2"
            item
            sm={12}
            md={12}
          >
            Empowering Brands to Embrace Sustainable Marketing
          </Typography>
        </Grid>

        <Grid
          className="wow animate__animated animate__fadeInRight animate__slow pt-3"
          item
          sm={12}
          style={{ fontSize: '18px' }}
        >
          <Typography>
            We aim to seamlessly integrate Environmental, Social and Governance (ESG) considerations into your
            organization's CMO strategies by deeply understanding your needs. Our Advisory Services and an AI enabled
            carbon accounting NetZero Platform,
            {/* <Link to="/netzero-platform" style={{ color: '#ffffd9', textDecoration: 'none' }}>
              NetZero Platform
            </Link> */}
            <b> based on GHG Protocol framework </b> is designed to measure the CO<sub>2</sub> footprint generated from
            your diverse marketing activities.
            {/* , designed to measure the CO<sub>2</sub> footprint generated from your diverse marketing activities. */}
          </Typography>
          <Typography sx={{ marginTop: '6px' }}>
            Adopting sustainable marketing not only reduces emissions but also enhances your brand reputation, drives
            customer loyalty, and even improves your Return on Investments (ROI).
          </Typography>
          {/* Boxes Section */}
          <Grid container justifyContent="center" spacing={2} sx={{ mt: 2 }}>
            {/* First Box */}
            <Grid item lg={3} xs={12} sm={6} md={4}>
              <Box className="bg-light template-inner-theme p-3 rounded-1 text-start">
                <Typography className="fontFamily fs-3 fw-bold box-title-padding">5%</Typography>
                <Typography>Reduce your marketing budgets by up to 5% in the first year itself.</Typography>
              </Box>
            </Grid>
            {/* Second Box */}
            <Grid item lg={3} xs={12} sm={6} md={4}>
              <Box className="bg-light template-inner-theme p-3 rounded-1 text-start">
                <Typography className="fontFamily fs-3 fw-bold box-title-padding">20%</Typography>
                <Typography>Reduce your marketing carbon footprint by up to 20% in one year.</Typography>
              </Box>
            </Grid>

            {/* Third Box */}
            <Grid item lg={3} xs={12} sm={6} md={4}>
              <Box className="bg-light template-inner-theme p-3 rounded-1 text-start">
                <Typography className="fontFamily fs-3 fw-bold box-title-padding">100%</Typography>
                <Typography>Achieve close to 100% Return on Investment from the first year.</Typography>
              </Box>
            </Grid>
          </Grid>
        </Grid>

        {/* <Grid className="" item xs={12} sm={2} md={2} /> */}

        <Grid
          item
          xs={12}
          sm={12}
          md={10}
          className="fs-5 mx-auto wow animate__animated animate__fadeInLeft animate__slow"
        >
          <div
            className="video-responsive"
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',

              margin: '0 auto',
              paddingTop: useMediaQuery(theme.breakpoints.up('md')) ? '42px' : '25px',
              paddingBottom: useMediaQuery(theme.breakpoints.up('md')) ? '20px' : '25px',
            }}
          >
            <video
              loop
              muted
              controls
              playsInline
              poster={posterImg}
              style={{
                objectFit: 'cover',
                width: useMediaQuery(theme.breakpoints.up('md')) ? '45%' : '65%',
                margin: '0 auto',
              }}
            >
              <source src={'https://sirat.earth:8000/videos/CEO Video-Updates.mp4'} type={'video/mp4'} />
              <source src={'https://sirat.earth:8000/videos/CEO Video-Updates3.mov'} type={'video/mov'} />
              <p>
                Sorry, your browser doesn't support embedded videos, but don't worry, you can{' '}
                <a href="https://gosustainable.ai/wp-content/uploads/2024/01/Shafeeq-Video.mp4">download it</a> and
                watch it with your favorite video player!
              </p>
              <track kind="captions" src="captions.vtt" label="English" default />
            </video>
          </div>
        </Grid>
        {/* <Grid className="fs-5" item xs={12} sm={2} md={2} /> */}
      </Grid>

      <Grid
        container
        justifyContent="center"
        className="bg-white wow animate__animated animate__fadeInRight animate__slow mx-auto"
        color="#054723"
      >
        <Grid item sm={12} md={12} className="d-flex justify-content-center pt-4">
          <Typography className="fontFamily fs-3 fw-bold text-center wow animate__animated animate__fadeInLeft animate__slow template-outer-theme">
            Our Customers
          </Typography>
        </Grid>
        <div
          style={{
            position: 'relative',
            width: '100%',
            height: '100%',
            maxHeight: '500px',
            overflow: 'hidden',
          }}
        >
          {/* Background Image */}
          <img
            src={OurCustomersBgImg2}
            alt="Customers img"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: 'block',
            }}
          />

          <div
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              top: 0,
              left: useMediaQuery(theme.breakpoints.up('sm')) ? '110px' : '60px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              color: 'white',
              textAlign: 'center',
              fontSize: 'clamp(10px, 4vw, 45px)',
              textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)',
              zIndex: 2,
              padding: '0 20px',
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: useMediaQuery(theme.breakpoints.up('sm')) ? '600px' : '270px',
              }}
            >
              <div className="d-flex justify-content-center flex-column align-items-center p-4 rounded-3 mx-0">
                <img src={TrustOne} alt="img" style={{ width: '100%', maxWidth: '300px' }} />
              </div>
              <div
                className="box-with-border"
                style={{ height: useMediaQuery(theme.breakpoints.up('sm')) ? '120px' : '40px', color: '#054723' }}
              />

              <div className=" d-flex justify-content-center flex-column align-items-center p-4 rounded-3 mx-0">
                <img
                  src={Hutch}
                  alt="img"
                  style={{ width: useMediaQuery(theme.breakpoints.up('sm')) ? '145px' : '45px', maxWidth: '300px' }}
                />
              </div>
              <div
                className="box-with-border"
                style={{ height: useMediaQuery(theme.breakpoints.up('sm')) ? '120px' : '40px', color: '#054723' }}
              />

              <div className="d-flex justify-content-center flex-column align-items-center p-4 rounded-3 mx-0">
                <img src={TrustTwo} alt="img" style={{ width: '100%', maxWidth: '300px' }} />
              </div>
            </div>
          </div>
        </div>
      </Grid>

      <Typography
        className="fontFamily fs-3 fw-bold text-center wow animate__animated animate__fadeInLeft animate__slow template-outer-theme pb-4"
        sx={{
          pt: 4,
          pb: 4,
          '@media (min-width:600px)': { pt: 5 },
        }}
      >
        Customer Testimonials
      </Typography>

      <Grid
        container
        rowSpacing={2}
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        className="bg-white wow animate__animated animate__fadeInRight animate__slow setHome_padding"
      >
        <Grid item xs={12} sm={12} md={4} sx={{ marginTop: '5px' }}>
          <img
            src={testimonial1}
            alt="Client Testimonial 1"
            style={{ width: '100%', maxHeight: '300px', objectFit: 'contain', borderRadius: '8px' }}
          />
        </Grid>

        <Grid item xs={12} sm={12} md={4} sx={{ marginTop: '5px' }}>
          <img
            src={testimonial2}
            alt="Client Testimonial 2"
            style={{ width: '100%', maxHeight: '300px', objectFit: 'contain', borderRadius: '8px' }}
          />
        </Grid>

        <Grid item xs={12} sm={12} md={4}>
          <img
            src={testimonial3}
            alt="Client Testimonial 3"
            style={{ width: '100%', maxHeight: '305px', objectFit: 'contain', borderRadius: '8px' }}
          />
        </Grid>
      </Grid>

      {/* <Grid container item xs={12} sm={12} md={4} spacing={2} justifyContent="center">
        <Grid item lg={4} xs={12} sm={12} md={4} className="d-flex justify-content-center">
            <Box className="box-with-border d-flex justify-content-center flex-column align-items-center p-4 rounded-3 mx-0" 
                 sx={{
                    width: { xs: 'auto', sm: 200, md: 220 },  // Adjust width for medium screens
                    maxWidth: 220  // Ensure it doesn’t grow too large on larger screens
                }}>
                <img src={TrustOne} alt='img' style={{ width: '100%', maxWidth: '300px' }} />
            </Box>
        </Grid>
        
        <Grid item lg={4} xs={12} sm={12} md={4} className="d-flex justify-content-center">
            <Box className="box-with-border d-flex justify-content-center flex-column align-items-center p-4 rounded-3 mx-0" 
                 sx={{
                    width: { xs: 'auto', sm: 200, md: 220 },
                    maxWidth: 220
                }}>
                <img src={Hutch} alt='img' style={{ width: '100%', maxWidth: '300px' }} />
            </Box>
        </Grid>
        
        <Grid item lg={4} xs={12} sm={12} md={4} className="d-flex justify-content-center">
            <Box className="d-flex justify-content-center flex-column align-items-center p-4 rounded-3 mx-0" 
                 sx={{
                    width: { xs: 'auto', sm: 200, md: 220 },
                    maxWidth: 220
                }}>
                <img src={TrustTwo} alt='img' style={{ width: '100%', maxWidth: '300px' }} />
            </Box>
        </Grid>
    </Grid> */}

      {/* <Grid
          container
          className=" wow animate__animated animate__fadeInRight animate__slow pb-3 bg-light mx-auto template-inner-theme rounded-3 setWidthofBanner"
          style={{ marginBottom: '50px', marginTop: '17px' }}
        >
          <Grid item sm={12} md={12} className="d-flex justify-content-center">
            <Typography
              className="fontFamily fs-3 fw-bold text-center wow animate__animated animate__fadeInLeft animate__slow pt-3 pb-2"
              item
              sm={12}
              md={12}
            >
              Tailored Solutions
            </Typography>
          </Grid>
          <div className="container">
            <div className="row d-flex">
              <div className="col-xl-4 col-md-12 col-sm-12 ">
                <img
                  src={tailored1}
                  alt="img"
                  width={80}
                  className="tabImgWhite mt-3 ms-xl-3"
                  style={{
                    display: useMediaQuery(theme.breakpoints.up('md')) ? '' : 'block',
                    margin: useMediaQuery(theme.breakpoints.up('md')) ? '' : 'auto',
                  }}
                />
                <h1
                  className="fs-5 pt-3 pb-4 fontFamily fw-bold ms-xl-3"
                  style={{ textAlign: useMediaQuery(theme.breakpoints.up('md')) ? 'start' : 'center' }}
                >
                  Corporate Events
                </h1>
                <p className="ps-xl-3">
                  Position sustainability at the core of your event with tailored solutions for global reach, media
                  coverage, and social media engagement
                </p>
              </div>
              <div className="col-xl-4 col-md-12 col-sm-12  ">
                <img
                  src={tailored2}
                  alt="img"
                  width={80}
                  className="tabImgWhite mt-3 ms-xl-3"
                  style={{
                    display: useMediaQuery(theme.breakpoints.up('md')) ? '' : 'block',
                    margin: useMediaQuery(theme.breakpoints.up('md')) ? '' : 'auto',
                  }}
                />
                <h1
                  className="fs-5 pt-3 pb-4 fontFamily fw-bold ms-xl-3"
                  style={{ textAlign: useMediaQuery(theme.breakpoints.up('md')) ? 'start' : 'center' }}
                >
                  Large Exhibitions
                </h1>
                <p className="ps-xl-3">
                  Develop a robust governance model and align exhibitors with a common environmental goal to deliver a
                  positive social impact
                </p>
              </div>
              <div className="col-xl-4 col-md-12 col-sm-12 ">
                <img
                  src={tailored3}
                  alt="img"
                  width={80}
                  className="tabImgWhite mt-3 ms-xl-3"
                  style={{
                    display: useMediaQuery(theme.breakpoints.up('md')) ? '' : 'block',
                    margin: useMediaQuery(theme.breakpoints.up('md')) ? '' : 'auto',
                  }}
                />
                <h1
                  className="fs-5 pt-3 pb-4 fontFamily fw-bold ms-xl-3"
                  style={{ textAlign: useMediaQuery(theme.breakpoints.up('md')) ? 'start' : 'center' }}
                >
                  Digital Campaigns
                </h1>
                <p className="ps-xl-3">
                  Create eco-friendly digital campaigns, reduce your digital marketing carbon footprint by optimising
                  your content and promote sustainability
                </p>
              </div>
            </div>
          </div> */}
      {/* flex wrap property for contain show in as a row */}
      {/* <Grid item sm={12} md={12} className="d-flex justify-content-between  setWidthofBanner">
                    <Box className="d-flex justify-content-xl-left justify-content-sm-center flex-column align-items-xl-start align-items-sm-center p-4 rounded-3 mx-0 flex-nowrap flex-sm-wrap">
                        <img src={tailored1} alt="img" width={80} className='tabImgWhite' />
                        <Typography variant='h6' className='fs-5 pt-3 pb-4 fontFamily fw-bold'>Corporate Events</Typography>
                        <Typography className='fs-6 align-items-xl-start align-items-sm-center'>Position sustainability at the core of your event with tailored solutions for global reach, media coverage, and social media engagement</Typography>
                    </Box>
                    <Box className="d-flex justify-content-xl-left justify-content-sm-center flex-column align-items-left p-4 rounded-3 mx-0 flex-nowrap flex-sm-wrap">
                        <img src={tailored2} alt="img" width={80} className='tabImgWhite' />
                        <Typography variant='h6' className='fs-5 pt-3 pb-4 fontFamily fw-bold'>Large Exhibitions</Typography>
                        <Typography className='fs-6 align-items-xl-start align-items-sm-center'>Develop a robust governance model and align exhibitors with a common environmental goal to deliver a positive social impact</Typography>
                    </Box>
                    <Box className="d-flex justify-content-xl-left justify-content-sm-center flex-column align-items-left p-4 rounded-3 mx-0 flex-nowrap flex-sm-wrap">
                        <img src={tailored3} alt="img" width={80} className='tabImgWhite' />
                        <Typography variant='h6' className='fs-5 pt-3 pb-4 fontFamily fw-bold'>Digital Campaigns</Typography>
                        <Typography className='fs-6 align-items-xl-start align-items-sm-center'>Create eco-friendly digital campaigns, reduce your digital marketing carbon footprint by optimising your content and promote sustainability</Typography>
                    </Box>
                </Grid> */}
      {/* </Grid> */}
      {/* 
      <Box
        className="credit d-flex justify-content-center"
        maxHeight={1200}
        style={{ height: useMediaQuery(theme.breakpoints.up('sm')) ? '450px' : '350px' }}
      >
        <Grid container spacing={2}>
          <Grid
            item
            xs={12}
            xl={6}
            md={6}
            className="wow animate__animated animate__fadeInUp animate__slow my-auto ms-xl-4 ms-sm-5"
          >
            <Typography
              variant="h6"
              className="text-light fs-1 pt-2 pb-4 fontFamily fw-bold ps-xl-5 ps-md-5 ps-sm-5  ms-4"
            >
              {' '}
              Offset Your Carbon Footprint
            </Typography>
            <Typography
              className="text-light fs-xl-5 fs-sm-5 ps-md-5 ps-sm-5 ms-4 me-3"
              style={{ fontSize: useMediaQuery(theme.breakpoints.up('sm')) ? '' : '16px' }}
            >
              Compensate for emissions by funding projects that reduce or remove an equivalent amount of CO
              <sub>2</sub> from the atmosphere, helping to mitigate climate change and promote sustainable development.
            </Typography>
            <div className="ms-xl-5 ms-lg-5 ms-md-5 ms-sm-5">
              <Button
                className="custom-btn my-4 ms-4"
                onClick={() => {
                  setOpenCredit(true);
                }}
              >
                {' '}
                Buy Credits
              </Button>
            </div>
          </Grid>
          {/* <Grid item xs={12} md={6} /> */}
      {/* </Grid> */}
      {/* </Box> */}

      {/* Buy Credits */}
      <Dialog
        open={openCredit}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: () => {
            handleSubmit();
            handleClose();
          },
        }}
      >
        <DialogContent>
          <DialogContentText>
            <div className="d-flex justify-content-center">
              <img src={Logo} width={'140vh'} alt="logo" style={{ marginBottom: '10px' }} />
            </div>
            <span className="d-block mb-1" style={{ fontWeight: 750, fontSize: '12px' }}>
              Do you want to buy credits?
            </span>
            <span className="d-block mb-3" style={{ fontWeight: 750, fontSize: '12px' }}>
              Fill out the form below. We'll reply within 24-48 hrs.
            </span>
          </DialogContentText>
          <Grid container direction="column" spacing={2}>
            <Grid item>
              <TextField
                autoFocus
                label="Company Name"
                variant="outlined"
                fullWidth
                name="cName"
                value={values.cName}
                onChange={handleChange}
                error={formik.touched.cName && Boolean(formik.errors.cName)}
                helperText={formik.touched.cName && formik.errors.cName}
                inputProps={{ style: { fontSize: '12px' } }}
              />
            </Grid>
            <Grid item>
              <TextField
                autoFocus
                label="Name"
                variant="outlined"
                fullWidth
                name="name"
                value={values.name}
                onChange={handleChange}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
                inputProps={{ style: { fontSize: '12px' } }}
              />
            </Grid>
            <Grid item>
              <TextField
                label="Email"
                variant="outlined"
                fullWidth
                name="email"
                value={values.email}
                onChange={handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
                inputProps={{ style: { fontSize: '12px' } }}
              />
            </Grid>
            <Grid item>
              <TextField
                label="Mobile Number"
                variant="outlined"
                fullWidth
                name="mobile"
                type="number"
                value={values.mobile}
                onChange={handleChange}
                error={formik.touched.mobile && Boolean(formik.errors.mobile)}
                helperText={formik.touched.mobile && formik.errors.mobile}
                inputProps={{ style: { fontSize: '12px' } }}
              />
            </Grid>
            <Grid item>
              <TextField
                label="Message"
                variant="outlined"
                multiline
                rows={2}
                fullWidth
                name="message"
                value={values.message}
                onChange={handleChange}
                error={formik.touched.message && Boolean(formik.errors.message)}
                helperText={formik.touched.message && formik.errors.message}
                inputProps={{ style: { fontSize: '12px' } }}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <LoadingButton
            type="submit"
            onClick={handleSubmit}
            variant="contained"
            disabled={!!isLoading}
            size="small"
            style={{ background: 'rgb(5, 71, 35)' }}
          >
            {isLoading ? <CircularProgress size={27} /> : 'Submit'}
          </LoadingButton>
          <Button
            variant="contained"
            onClick={() => {
              resetForm();
              handleClose();
            }}
            size="small"
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Index;
