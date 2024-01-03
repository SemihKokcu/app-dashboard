import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  Container,
  Row,
  Col,
} from "reactstrap";
import UserHeader from "components/Headers/UserHeader.js";
import { useDispatch, useSelector } from "react-redux";
import { createAboutUs, getAboutUs, updateAboutUs } from "../../store/actions/AboutUsActions.js";

const validationSchema = Yup.object().shape({
  title: Yup.string().required("Başlık zorunlu."),
  email: Yup.string().email("Geçerli bir email giriniz.").required("Email zorunlu."),
  description: Yup.string().required("Açıklama zorunlu."),
  phoneNumber: Yup.string().required("Telefon numarası zorunlu."),
  address: Yup.string().required("Adres zorunlu."),
  city: Yup.string().required("Şehir zorunlu."),
  country: Yup.string().required("Ülke zorunlu."),
  postalCode: Yup.number().required("Posta kodu zorunlu."),
  instagramUrl: Yup.string().url("Geçerli bir URL giriniz."),
  youtubeUrl: Yup.string().url("Geçerli bir URL giriniz."),
  facebookUrl: Yup.string().url("Geçerli bir URL giriniz."),
  linkedinUrl: Yup.string().url("Geçerli bir URL giriniz."),
  isActive: Yup.boolean(),
});

const AboutUs = () => {
  const dispatch = useDispatch();
  const { aboutUsData } = useSelector((state) => state.aboutUs);
  const [steps, setSteps] = useState([""]);

  useEffect(() => {
    dispatch(getAboutUs());
  }, [dispatch]);


  const handleSubmit = (values)=>{
    const aboutUsContent = {
        title:values.title,
        email: values.email,
        description: values.description,
        phoneNumber: values.phoneNumber,
        officalAddress: values.address,
        city: values.city,
        country: values.country,
        postalCode: values.postalCode,
        instagramUrl: values.instagramUrl,
        facebookUrl: values.facebookUrl,
        youtubeUrl: values.youtubeUrl,
        twitterUrl: values.twitterUrl,
        isActive : values.isActive,
        steps: steps.filter((step) => step.trim() !== ''),
      };
      if (aboutUsData.length > 0) {
        dispatch(updateAboutUs(aboutUsContent,aboutUsData[0]._id))
      }
      else{
        dispatch(createAboutUs(aboutUsContent))
      }
}
  const formik = useFormik({
    initialValues: {
      title: '',
      email: '',
      description: '',
      phoneNumber: '',
      address: '',
      city: '',
      country: '',
      postalCode: '',
      instagramUrl: '',
      youtubeUrl: '',
      facebookUrl: '',
      linkedinUrl: '',
      isActive: false,
    },
    validationSchema,
    onSubmit: handleSubmit
  });


  useEffect(() => {
    if (aboutUsData && aboutUsData.length > 0) {
      const aboutData = aboutUsData[0];
      setSteps([...aboutData.steps]);
  
      formik.setValues({
        title: aboutData.title || '',
        email: aboutData.email || '',
        description: aboutData.description || '',
        phoneNumber: aboutData.phoneNumber || '',
        address: aboutData.officalAddress || '',
        city: aboutData.city || '',
        country: aboutData.country || '',
        postalCode: aboutData.postalCode || '',
        instagramUrl: aboutData.instagramUrl || '',
        youtubeUrl: aboutData.youtubeUrl || '',
        facebookUrl: aboutData.facebookUrl || '',
        linkedinUrl: aboutData.linkedinUrl || '',
        isActive: aboutData.isActive || false, 
      });
    }
    // eslint-disable-next-line
    console.log(aboutUsData);
  }, [aboutUsData]);
  
  
  const addStep = () => {
    setSteps([...steps, ""]);
  };

  const removeStep = (index) => {
    const newSteps = [...steps];
    newSteps.splice(index, 1);
    setSteps(newSteps);
  };

  return (
    <>
      <UserHeader />
      <Container className="mt--7" fluid>
        <Row>
          <Col className="order-xl-1" xl="12">
            <Card className="bg-secondary shadow">
              <CardHeader className="bg-white border-0">
                <Row className="align-items-center">
                  <Col xs="8">
                    <h3 className="mb-0">Hakkımızda Bilgileri</h3>
                  </Col>
                  <Col className="text-right" xs="4"></Col>
                </Row>
              </CardHeader>
              <CardBody>
                
                <Form onSubmit={formik.handleSubmit}>
                  <h6 className="heading-small text-muted mb-4">Genel Bilgiler</h6>
                  <div className="pl-lg-4">
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label className="form-control-label" htmlFor="input-title">
                            Başlık
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-title"
                            placeholder="Başlık"
                            type="text"
                            name="title"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.title}
                          />
                          {formik.touched.title && formik.errors.title && (
                            <div className="text-danger">{formik.errors.title}</div>
                          )}
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label className="form-control-label" htmlFor="input-email">
                            Email adresi
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-email"
                            placeholder="jesse@example.com"
                            type="email"
                            name="email"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.email}
                          />
                          {formik.touched.email && formik.errors.email && (
                            <div className="text-danger">{formik.errors.email}</div>
                          )}
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label className="form-control-label" htmlFor="input-descp">
                            Açıklama
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-descp"
                            placeholder="Şirket açıklaması..."
                            type="textarea"
                            name="description"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.description}
                          />
                          {formik.touched.description && formik.errors.description && (
                            <div className="text-danger">{formik.errors.description}</div>
                          )}
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label className="form-control-label" htmlFor="input-phone-number">
                            Telefon Numarası
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-phone-number"
                            placeholder="Telefon Numarası Giriniz"
                            type="tel"
                            name="phoneNumber"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.phoneNumber}
                          />
                          {formik.touched.phoneNumber && formik.errors.phoneNumber && (
                            <div className="text-danger">{formik.errors.phoneNumber}</div>
                          )}
                        </FormGroup>
                      </Col>
                    </Row>
                  </div>
                  <hr className="my-4" />
                  <h6 className="heading-small text-muted mb-4">İletişim Bilgileri</h6>
                  <div className="pl-lg-4">
                    <Row>
                      <Col md="12">
                        <FormGroup>
                          <label className="form-control-label" htmlFor="input-address">
                            Address
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-address"
                            placeholder="Açık Adres"
                            type="text"
                            name="address"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.address}
                          />
                          {formik.touched.address && formik.errors.address && (
                            <div className="text-danger">{formik.errors.address}</div>
                          )}
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="4">
                        <FormGroup>
                          <label className="form-control-label" htmlFor="input-city">
                            Şehir
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-city"
                            placeholder="Şehir"
                            type="text"
                            name="city"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.city}
                          />
                          {formik.touched.city && formik.errors.city && (
                            <div className="text-danger">{formik.errors.city}</div>
                          )}
                        </FormGroup>
                      </Col>
                      <Col lg="4">
                        <FormGroup>
                          <label className="form-control-label" htmlFor="input-country">
                            Ülke
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-country"
                            placeholder="Ülke"
                            type="text"
                            name="country"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.country}
                          />
                          {formik.touched.country && formik.errors.country && (
                            <div className="text-danger">{formik.errors.country}</div>
                          )}
                        </FormGroup>
                      </Col>
                      <Col lg="4">
                        <FormGroup>
                          <label className="form-control-label" htmlFor="input-postal-code">
                            Posta Kodu
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-postal-code"
                            placeholder="Posta Kodu"
                            type="number"
                            name="postalCode"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.postalCode}
                          />
                          {formik.touched.postalCode && formik.errors.postalCode && (
                            <div className="text-danger">{formik.errors.postalCode}</div>
                          )}
                        </FormGroup>
                      </Col>
                    </Row>
                  </div>
                  <hr className="my-4" />
                  <h6 className="heading-small text-muted mb-4">Sosyal Medya</h6>
                  <div className="pl-lg-4">
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label className="form-control-label" htmlFor="input-instagram-url">
                            İnstagram Adresi
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-instagram-url"
                            placeholder="Instagram URL giriniz"
                            type="url"
                            name="instagramUrl"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.instagramUrl}
                          />
                          {formik.touched.instagramUrl && formik.errors.instagramUrl && (
                            <div className="text-danger">{formik.errors.instagramUrl}</div>
                          )}
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label className="form-control-label" htmlFor="input-youtube-url">
                            Youtube Adresi
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-youtube-url"
                            placeholder="Youtube URL giriniz"
                            type="url"
                            name="youtubeUrl"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.youtubeUrl}
                          />
                          {formik.touched.youtubeUrl && formik.errors.youtubeUrl && (
                            <div className="text-danger">{formik.errors.youtubeUrl}</div>
                          )}
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label className="form-control-label" htmlFor="input-facebook-url">
                            Facebook Adresi
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-facebook-url"
                            placeholder="Facebook URL giriniz"
                            type="url"
                            name="facebookUrl"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.facebookUrl}
                          />
                          {formik.touched.facebookUrl && formik.errors.facebookUrl && (
                            <div className="text-danger">{formik.errors.facebookUrl}</div>
                          )}
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label className="form-control-label" htmlFor="input-linkedin-url">
                            Linediln Adresi
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-linkedin-url"
                            placeholder="Linkedin URL giriniz"
                            type="url"
                            name="linkedinUrl"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.linkedinUrl}
                          />
                          {formik.touched.linkedinUrl && formik.errors.linkedinUrl && (
                            <div className="text-danger">{formik.errors.linkedinUrl}</div>
                          )}
                        </FormGroup>
                      </Col>
                    </Row>
                  </div>
                  <hr className="my-4" />
                  <h6 className="heading-small text-muted mb-4">Proje Adımları</h6>
                  <div className="pl-lg-4">
                    <Row>
                      <FormGroup>
                        <ul>
                          {steps.map((step, index) => (
                            <li key={index}>
                              <div className="d-flex">
                                <Input
                                  className="mb-2"
                                  type="text"
                                  name={`steps[${index}]`}
                                  value={step}
                                  onChange={(e) => {
                                    const newSteps = [...steps];
                                    newSteps[index] = e.target.value;
                                    setSteps(newSteps);
                                  }}
                                />
                                {index > 0 && (
                                  <Button
                                    type="button"
                                    color="warning"
                                    className="ml-2 mt-1 "
                                    onClick={() => removeStep(index)}
                                  >
                                    Sil
                                  </Button>
                                )}
                              </div>
                            </li>
                          ))}
                        </ul>
                        <Button
                          type="button"
                          color="primary"
                          onClick={addStep}
                          className="mt-2"
                        >
                          Yeni Adım Ekle
                        </Button>
                      </FormGroup>
                    </Row>
                  </div>
                  <hr className="my-4" />
                  <h6 className="heading-small text-muted mb-4">Diğer Bilgiler</h6>
                  <div className="pl-lg-4">
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <Row>
                            <Col lg={4}>
                              <label
                                className="form-control-label"
                                htmlFor="isActive"
                              >
                                Hakkımızda Bilgileri Gösterilsin mi?
                              </label>
                            </Col>
                            <Col lg={3}>
                              <Input
                                className="form-control-alternative ml-1"
                                id="isActive"
                                type="checkbox"
                                name="isActive"
                                onChange={formik.handleChange}
                                checked={formik.values.isActive}
                              />
                            </Col>
                          </Row>
                        </FormGroup>
                      </Col>
                    </Row>
                    <hr className="my-4" />
                    <Row>
                      <Button className="button btn-block" color="success" type="submit">
                        {aboutUsData.length !=0 ? "Güncelle" : "Kaydet"}
                      </Button>
                    </Row>
                  </div>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default AboutUs;
