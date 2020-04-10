import React from "react";
import { BASE } from "src/utils/space";
import styled from "styled-components";

const Wrapper = styled.div`
  margin: -${BASE};
  padding: ${BASE};
  height: 60vh;
  overflow: scroll;
`;

const body = `Last Updated: January 1, 2020 Protecting your privacy is really important to SmartNews. Our
      mission is delivering the world’s quality information to the people who need it and this
      should not come at the price of your right to privacy. Accordingly, we’re providing this
      Privacy Policy to explain our practices regarding the collection, use and disclosure of
      information that we receive when you use our Services. This Privacy Policy does not apply to
      any third-party websites, services or applications, even if they are accessible through our
      Services. Any information that we collect is subject to the Privacy Policy in effect at the
      time that information is collected. We may, however, modify and revise this Privacy Policy
      from time to time. If we make any material changes to this Privacy Policy, we’ll notify you of
      those changes by posting them on the Services or other notification, and we’ll indicate when
      those changes will become effective. Also, please note that, unless we define a term in this
      Privacy Policy, all capitalized words used in this Privacy Policy have the same meanings as in
      our Terms of Service. Information We Collect Information Provided by You or Collected with
      Your Permission. When you first install and setup our App, we may collect information about
      your interests to help us understand what content you might be interested in. Depending on how
      you interact with the Services, we may also collect certain personal information that can be
      used to identify you, which may include your e-mail address, and/or other non-identifying
      information. We may also allow you to use certain social networking services (“SNS”) via the
      Services and may collect information about you from that SNS that you have made available via
      your privacy settings. For example, if you link your Twitter account to SmartNews and let us
      know that you want to see what news stories the people you follow on Twitter are sharing, the
      links to these news stories will be sent to you via our Services. Please refer to the privacy
      policy for the SNS you use for more information on how your information will be shared by the
      SNS and information available on your SNS accounts. Information Related to Your Use of the
      Services. We and third parties we work with may automatically collect certain information
      about how you use our Services. This information may include your Internet Protocol (IP)
      address, mobile advertising identifiers (Google Advertising ID or Apple Advertising ID) and
      other unique identifiers, cookie identifiers, user settings and preferences, details about
      your device, operating system, and app version, the pages, content or features of our Services
      you browse and the time you spend on those pages, content or features, the hyper-links from
      the contents displayed on our Services that you click on, referrer information and other
      information about how you use our Services. Location Information. We will collect information
      about your precise location if you enable this feature on the Services. In addition, you may
      provide us with your city and state information in order for us to display the weather to you.
      We may also infer your approximate location based off of your IP address and use various other
      technologies to determine your approximate location, such as sensor data from your device that
      provides information on nearby Wi-Fi access points and cell towers. Interactive Features.
      SmartNews may offer interactive features such as social media pages. SmartNews and other
      individuals who use our Services may collect the information you submit or make available
      through these interactive features. Any information shared on the public sections of these
      channels will be considered “public” and will not be subject to the privacy protections
      referenced herein. Surveys. We may contact you to participate in surveys. If you decide to
      participate, you may be asked to provide certain information which may include personal
      information.`;

const PrivacyPolicy: React.FC = () => <Wrapper>{body}</Wrapper>;

export default PrivacyPolicy;
