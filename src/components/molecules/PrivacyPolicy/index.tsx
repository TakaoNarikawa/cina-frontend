import React from "react";
import { BASE } from "src/utils/space";
import styled from "styled-components";

const Wrapper = styled.div`
  margin: -${BASE};
  padding: ${BASE};
  height: 30vh;
  overflow: scroll;
`;

const body = `
this was created on a hackathon on 2020/05/24
Information)
we will collect information about your precise location at any given moment.
We may also infer your approximate location based off of your IP address and
use various other technologies to determine your approximate location, such
as sensor data from your device that provides information on nearby Wi-Fi access points and cell towers.
we will also have access to all of your data on your phone, computer, tablet, anywhere.
We will even get your camera data and audio data and use it to identify and analyze you.
We will take all your data and sell it to all the big companies and governments.`;

const PrivacyPolicy: React.FC = () => <Wrapper>{body}</Wrapper>;

export default PrivacyPolicy;
