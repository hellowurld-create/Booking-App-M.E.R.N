import {
  Body,
  Button,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Preview,
  Section,
  Text,
} from "react-email/components";

import * as React from "react";


const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

export const FluxWelcomeEmail = () => (
  <Html>
    <Head />
    <Preview>
      Welcome to flux Houses
    </Preview>
    <Body style={main}>
      <Container style={container}>
        <Img
          src={`${API_BASE_URL}/assets/react.svg`}
          width="170"
          height="50"
          alt="flux"
          style={logo}
        />
        <Text style={paragraph}>Hi User,</Text>
        <Text style={paragraph}>
          Welcome to Flux Houses, the sales intelligence platform that helps you
          uncover qualified leads and close deals faster.
        </Text>
        <Section style={btnContainer}>
          <Button style={button} href={ `https://${API_BASE_URL}`}>
            Get started
          </Button>
        </Section>
        <Text style={paragraph}>
          Best,
          <br />
          The Flux team
        </Text>
        <Hr style={hr} />
        <Text style={footer}>
          unknown address, HIRE ME😁
        </Text>
      </Container>
    </Body>
  </Html>
);



export default FluxWelcomeEmail;

const main = {
  backgroundColor: "#ffffff",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: "0 auto",
  padding: "20px 0 48px",
};

const logo = {
  margin: "0 auto",
};

const paragraph = {
  fontSize: "16px",
  lineHeight: "26px",
};

const btnContainer = {
  textAlign: "center",
};

const button = {
  backgroundColor: "#5F51E8",
  borderRadius: "3px",
  color: "#fff",
  fontSize: "16px",
  textDecoration: "none",
  textAlign: "center",
  display: "block",
  padding: "12px",
};

const hr = {
  borderColor: "#cccccc",
  margin: "20px 0",
};

const footer = {
  color: "#8898aa",
  fontSize: "12px",
};
