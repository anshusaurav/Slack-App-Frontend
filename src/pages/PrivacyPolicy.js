import React, { Component } from 'react'
import Header from '../components/Header';
import Footer from '../components/Footer';
import PrivacyPolicyHero from "../components/PrivacyPolicyHero";
import SignupSection from '../components/SignupSection';
class PrivacyPolicy extends Component {
    render() {
        return (
            <div
                className="text-gray-700 bg-white"
                style={{ fontFamily: "'Raleway', sans-serif" }}
            >
                <Header />
                <PrivacyPolicyHero />
                <section className="text-gray-700 body-font">
                    <div className="container px-5 py-24 mx-auto">
                        <div className="flex flex-col w-full mb-12">
                            <h2 className="text-xl font-medium title-font mb-4 text-gray-900">Applicability of this Privacy Policy</h2>
                            <p className="  leading-relaxed text-base">This Privacy Policy applies to Pupbot’s online tool, including the associated Pupbot mobile and desktop applications (collectively, the <strong>“Services”</strong>), Pupbot.netlify.app and other Pupbot websites (collectively, the <strong>“Websites”</strong>) and other interactions (e.g., customer service inquiries, user conferences, etc.) you may have with Pupbot. If you do not agree with the terms, do not access or use the Services, Websites or any other aspect of Pupbot’s business.</p>
                            <br />
                            <p className="  leading-relaxed text-base">This Privacy Policy does not apply to any third party applications or software that integrate with the Services through the pupbot tool (<strong>“Third Party Services”</strong>), or any other third party products, services or businesses. In addition, a separate agreement governs delivery, access and use of the Services (the <strong>“Customer Agreement”</strong>), including the processing of any messages, files or other content submitted through Services accounts (collectively, <strong>“Customer Data”</strong>). The organization (e.g., your employer or another entity or person) that entered into the Customer Agreement (<strong>“Customer”</strong>) controls their instance of the Services (their <strong>“Standups”</strong> or <strong>“Surveys”</strong> or Other) and any associated Customer Data. If you have any questions about specific Standup settings and privacy practices, please contact the Customer whose Standup you use. If you have received an invitation to join a Standup in a Slack workspace but have not yet created an account, you should request assistance from the Customer that sent the invitation.</p>
                            <br />
                            <h2 className="text-xl font-medium title-font mb-4 text-gray-900">Information We Collect And Receive</h2>
                            <br />
                            <p>Pupbot may collect and receive Customer Data, and other information and data (<strong>“Other Information”</strong>) in a variety of ways:</p>
                            <br />
                            <ul className="list-disc" style={{ paddingInlineStart: 40 }}>
                                <li>
                                    <p><strong>Customer Data</strong>. Customers or individuals invited to use a Standup by a Customer (<strong>“Authorized Users”</strong>) routinely submit Customer Data to Pupbot when using the Services.</p>
                                </li>
                                <br />
                                <li>
                                    <p><strong>Personal Data</strong>. Pupbot is primarily a Data Processor for Data provided by the Customer (Data Controller). In order to use Pupbot Services, Personal Data provided by the Customer directly or indirectly (invitation to access Personal Data from a Workspace, or other) are accessible by Pupbot in order to generate and/or operate Standups. Authorized Users may provide Pupbot with their Personal Data directly at instances, for example when they provide feedback or request client support or in any way communicate with Pupbot. Pupbot will not collect or use any sensitive personal data unless Pupbot has received an express consent regarding the specific data.</p>
                                </li>
                                <br />
                                <li>
                                    <p><strong>Other Information</strong>. Pupbot also collects, generates and/or receives Other Information:</p>
                                    <br />
                                    <ol className="list-decimal" style={{ paddingInlineStart: 40 }}>
                                        <li>Standup, Workspace and Account Information. Teams use Pupbot services and its capabilities to achieve efficient collaboration, better results and communication among members. To use, create or update a standup, you or your Customer (e.g., your employer) supply Pupbot with information that may include an email address, phone number, password, domain and/or similar account details. In addition, Customers provide Pupbot (or its payment processors) with billing details such as credit card information, banking information and/or a billing address and/or email address.</li>
                                        <li>Usage Information.</li>
                                    </ol>
                                    <ul className="list-circle" style={{ paddingInlineStart: 40 }}>
                                        <li>
                                            <p><em>Services Metadata</em>. When an Authorized User interacts with the Services, metadata is generated that provides additional context about the way Authorized Users work. For example, Pupbot may log the Standups, channels, people, features, content and links you interact with, the types of files shared and what Third Party Services are used (if any).</p>
                                        </li>
                                        <br />
                                        <li>
                                            <p><em>Log data</em>. As with most websites and technology services delivered over the Internet, our servers automatically collect information when you access or use our Websites or Services and record it in log files. This log data may include the Internet Protocol (IP) address, the address of the web page visited before using the Website or Services, browser type and settings, the date and time the Services were used, information about browser configuration and plugins, language preferences and cookie data.</p>
                                        </li>
                                        <br />
                                        <li>
                                            <p><em>Report data</em>. When you or Customer participates and/or generates a Standup, Pupbot collects all supplied or relative information in view to produce and supply you and/or customer with results in form of a Report. Reports are archived and are retrievable by Customer. Reports may also be used for research, statistical purposes in order to improve Pupbot efficiency, update our App, as well as feedback in order to create and launch marketing campaigns.</p>
                                        </li>
                                        <br />
                                        <li>
                                            <p><em>Device information</em>. Pupbot may collect information about devices accessing the Services, including type of device, what operating system is used, device settings, application IDs, unique device identifiers and crash data. Whether we collect some or all of this Other Information often depends on the type of device used and its settings.</p>
                                        </li>
                                        <br />
                                        <li>
                                            <p><em>Location information</em>. We may receive information from you, your Customer and other third-parties that helps us approximate your location. We may, for example, use a business address submitted by your employer, or an IP address received from your browser or device to determine approximate location in order to inline our Services with your current time-zone. Pupbot may also collect location information from devices in accordance with the consent process provided by your device.</p>
                                        </li>
                                    </ul>
                                    <br />
                                    <ol className="list-decimal" style={{ paddingInlineStart: 40 }}>
                                        <li>
                                            <p>Cookie Information. Pupbot uses cookies and similar technologies in our Websites and Services that help us collect Other Information. The Websites and Services may also include cookies and similar tracking technologies of third parties, which may collect Other Information about you via the Websites and Services and across other websites and online services. You may also opt out of “third party cookies” by following the instructions provided in the Cookies Policy particulars before consenting to our use of Cookies when you visit our Websites and Services. If you have any questions about our Cookie Policy, you may contact us at <a href="mailto:hey@geekbot.io">hey@geekbot.io</a>.</p>
                                        </li>
                                        <br />
                                        <li>
                                            <p>Third Party Services. Typically, Third Party Services are software that integrates with our Services, and Customer can permit its Authorized Users to enable and disable certain integrations, while other (e.g. invoicing, billing, payments’ integrations) are required for the operation of Pupbot therefore Customer or Authorized Users are required to use if they intend to use Pupbot. Once enabled, the provider of a Third Party Service may share certain information with Pupbot. Authorized Users should check the privacy settings and notices in these Third Party Services to understand what data may be disclosed to Pupbot. When a Third Party Service is enabled, Pupbot is authorized to connect and access Other Information made available to Pupbot in accordance with our agreement with the Third Party Provider. We do not, however, receive or store passwords or means of payment/ transaction details (for example credit-card numbers) for any of these Third Party Services when connecting them to the Services. Furthermore, for purposes of Due Diligence, Analytics, Client Support, Quality Control and Communication we may employ Third Party Services in view to acquire information and data, as well as Personal Data, in order to comply with our legal, contractual or client service and support obligations as well as improve our product. Such services may include (list non-exhaustive) Google Analytics, Zoho Invoicing, Clearbit services, Wirecard Payments, Intercom, etc.</p>
                                        </li>
                                        <br />
                                        <li>
                                            <p>Contact Information. In accordance with the consent process provided by your device, any information that an Authorized User chooses to import may be collected when using the Services.</p>
                                        </li>
                                        <br />
                                        <li>
                                            <p>Third Party Data. Pupbot may receive data as stated in IV above, as well as about organizations, industries, Website visitors, marketing campaigns and other matters related to our business from parent corporation(s), affiliates and subsidiaries, our partners or others that we use to make our own information better or more useful. This data may be combined with Other Information we collect and might include aggregate level data, such as which IP addresses correspond to zip codes or countries. Or it might be more specific: for example, how well an online marketing or email campaign performed.</p>
                                        </li>
                                        <br />
                                        <li>
                                            <p>Additional Information Provided to Pupbot. We receive Other Information when submitted to our Websites or if you request support, interact with our social media accounts or otherwise communicate with Pupbot.</p>
                                        </li>
                                    </ol>
                                </li>
                            </ul>
                            <br />
                            <p className=" leading-relaxed text-base">Generally, no one is under a statutory or contractual obligation to provide any Customer Data or Other Information (collectively, <strong>“Information”</strong>). However, certain Information is collected automatically and, if some Information, such as setup details, is not provided, we may be unable to provide the Services.</p>
                            <br />
                            <h2 className="text-xl font-medium title-font mb-4 text-gray-900">How We Use Information</h2>
                            <p className=" leading-relaxed text-base">Customer Data will be used by Pupbot in accordance with Customer’s instructions, including any applicable terms in the Customer Agreement and Customer’s use of Services functionality, and as required by applicable law. Pupbot is a processor of Customer Data and Customer is the controller. Customer may, for example, use the Services to grant and remove access to an Authorized User, assign roles and configure settings, access, modify, export, share and remove Customer Data and otherwise apply its policies to the Services.</p>
                            <p className=" leading-relaxed text-base">Pupbot uses Other Information in furtherance of our legitimate interests in operating our Services, Websites and business. More specifically, Pupbot uses Other Information:</p>
                            <ul className="list-disc" style={{ paddingInlineStart: 40 }}>
                                <li><strong>To provide, update, maintain and protect our Services, Websites and business.</strong> This includes use of Other Information to support delivery of the Services under a Customer Agreement, prevent or address service errors, security or technical issues, analyze and monitor usage, trends and other activities or at an Authorized User’s request.</li>
                                <br />
                                <li><strong>As required by applicable law, legal process or regulation.</strong></li>
                                <br />
                                <li><strong>To communicate with you by responding to your requests, comments and questions.</strong> If you contact us, we may use your Other Information to respond.</li>
                                <br />
                                <li><strong>To develop and provide search, learning and productivity tools and additional features.</strong> Pupbot tries to make the Services as useful as possible for Customers and Authorized Users. For example, we may improve configuration functionality by using Other Information to help determine and rank the relevance of content, series and hierarchy of questions to an Authorized User, make Services suggestions based on historical use and predictive models, identify organizational trends and insights, to customize a Services experience, create new productivity features and products and apply machine learning capabilities in view to further improve and integrate Pupbot Reports.</li>
                                <br />
                                <li><strong>To send emails and other communications.</strong> We may send you service, technical and other administrative emails, messages and other types of communications. We may also contact you to inform you about changes in our Services, our Services offerings, and important Services-related notices, such as security and fraud notices, update policies, terms of use or requests for consent. These communications are considered part of the Services and you may not opt out of them. In addition, we sometimes send emails about new product features, promotional communications or other news about Pupbot. These are marketing messages so you can control whether you receive them and you can unsubscribe from such service anytime.</li>
                                <br />
                                <li><strong>For billing, account management and other administrative matters.</strong> Pupbot may need to contact you for invoicing, account management and similar reasons and we use account data to administer accounts and keep track of billing and payments. Such data and information will be furthermore retained and used as may be required by applicable law.</li>
                                <br />
                                <li><strong>To investigate and help prevent security issues and abuse.</strong></li>
                                <br />
                                <li><strong>To provide Pupbot Reports.</strong></li>
                            </ul>
                            <br />
                            <p className=" leading-relaxed text-base">If Information is aggregated or de-identified so it is no longer reasonably associated with an identified or identifiable natural person, Pupbot may use it for any business purpose. To the extent Information is associated with an identified or identifiable natural person and is protected as personal data under applicable data protection law, it is referred to in this Privacy Policy as “Personal Data”.</p>
                            <h2 className="text-xl font-medium title-font mb-4 text-gray-900">Data Retention</h2>
                            <p className=" leading-relaxed text-base">Pupbot will retain Customer Data in accordance with a Customer’s instructions, including any applicable terms in the Customer Agreement and Customer’s use of Services functionality, and as required by applicable law. Depending on the Services plan, Customer may be able to customize its retention settings and apply those customized settings. The deletion of Customer Data and other use of the Services by Customer may result in the deletion and/or de-identification of certain associated Other Information. Pupbot may retain Other Information pertaining to you for as long as necessary for the purposes described in this Privacy Policy. This may include keeping your Other Information after you have deactivated your account for the period of time needed for Pupbot to pursue legitimate business interests, conduct audits, comply with (and demonstrate compliance with) legal obligations, resolve disputes, enforce our agreements, archiving, statistical or research purposes.</p>
                            <h2 className="text-xl font-medium title-font mb-4 text-gray-900">How We Share And Disclose Information</h2>
                            <p className=" leading-relaxed text-base">This section describes how Pupbot may share and disclose Information. Customers determine their own policies and practices for the sharing and disclosure of Information, and Pupbot does not control how they or any other third parties choose to share or disclose Information. Furthermore, as Standups, Reports or Data input may be visible or accessible by Authorized Users, Pupbot does not control how they or any other parties chose to share or disclose such Information.</p>
                            <ul className="list-disc" style={{ paddingInlineStart: 40 }}>
                                <li><strong>Customer’s Instructions</strong>. Pupbot may share and disclose Customer Data in accordance with a Customer’s instructions, including any applicable terms in the Customer Agreement and Customer’s use of Services functionality, and in compliance with applicable law and legal process.</li>
                                <br />
                                <li><strong>Displaying the Services</strong>. When an Authorized User submits Other Information, it may be displayed to other Authorized Users. Please consult the FAQ for more information on Services functionality.</li>
                                <br />
                                <li><strong>Collaborating with Others</strong>. The Services provide different ways for Authorized Users to collaborate. Other Information, such as an Authorized User’s profile Information, may be shared, subject to the policies and practices.</li>
                                <br />
                                <li><strong>Customer Access</strong>. Owners, administrators, Authorized Users and other Customer representatives and personnel may be able to access, modify or restrict access to Other Information. This may include, for example, your employer using Service features to export activity logs and reports.</li>
                                <br />
                                <li><strong>Third Party Service Providers and Partners</strong>. We may engage third party companies or individuals as service providers or business partners to process Other Information and support our business. These third parties may, for example, provide virtual computing and storage services. Additional information about the sub-processors we use to support delivery of our Services is set forth at Pupbot Sub-processors.</li>
                                <br />
                                <li><strong>Third Party Services</strong>. Customer may enable or permit Authorized Users to enable Third Party Services. When enabled, Pupbot may share Other Information with Third Party Services. Third Party Services are not owned or controlled by Pupbot and third parties that have been granted access to Other Information may have their own policies and practices for its collection and use. Please check the privacy settings and notices in these Third Party Services or contact the provider for any questions. If required by our policies or law, we will ask for your consent and/or the Customer’s before engaging any such service.</li>
                                <br />
                                <li><strong>Corporate Affiliates</strong>. Pupbot may share Other Information with its corporate affiliates, parents and/or subsidiaries.</li>
                            </ul>
                            <br />
                            <p className=" leading-relaxed text-base">During a Change to Pupbot’s Business. If Pupbot engages in a merger, acquisition, bankruptcy, dissolution, reorganization, sale of some or all of Pupbot’s assets or stock, financing, public offering of securities, acquisition of all or a portion of our business, a similar transaction or proceeding, or steps in contemplation of such activities (e.g. due diligence), some or all Other Information may be shared or transferred, subject to standard confidentiality arrangements.
                            Aggregated or De-identified Data. We may disclose or use aggregated or de-identified Other Information for any purpose. For example, we may share aggregated or de-identified Other Information with prospects or partners for business or research purposes, such as telling a prospective Pupbot customer the average amount of time spent within a typical standup.
                            To Comply with Laws, enforce our rights, prevent fraud, and for safety. If we receive a request for information, we may disclose Other Information if we reasonably believe disclosure is in accordance with or required by any applicable law, regulation or legal process. We cooperate with law enforcement authorities, as well as with other third parties, to enforce laws, intellectual property rights and to prevent fraud. In response to a verified request by law enforcement or other government officials relating to a criminal investigation or alleged illegal activity, we can, and you authorize us to, disclose your name, e-mail address and website use history, with or without a subpoena. Without limiting the above, we will not disclose your Information to any law enforcement or other governmental officials without a subpoena or court order, except when we believe in good faith that the disclosure of information is necessary to protect our rights, enforce our policies, respond to claims that your use of our Services violates Pupbot’s policies or rights or others, or protect anyone’s rights, property or safety, enforce contracts or policies.
                            With Consent. Pupbot may share Other Information with third parties when we have consent to do so.</p>
                            <br />
                            <h2 className="text-xl font-medium title-font mb-4 text-gray-900">Security</h2>
                            <p className=" leading-relaxed text-base">Pupbot takes security of data very seriously. Pupbot works hard to protect all and Other Information you provide from loss, misuse, and unauthorized access or disclosure. To learn more about current practices and policies regarding security and confidentiality of the Services, please see our Security Practices. Given the nature of communications and information processing technology, Pupbot cannot guarantee that Information, during transmission through the Internet or while stored on our systems or otherwise in our care, will be absolutely safe from intrusion by others.</p>
                            <br />
                            <h2 className="text-xl font-medium title-font mb-4 text-gray-900">Age Limitations</h2>
                            <p className=" leading-relaxed text-base">To the extent prohibited by applicable law, Pupbot does not allow use of our Services and Websites by anyone younger than 16 years old. If you learn that anyone younger than 16 has unlawfully provided us with personal data, please contact us and we will take steps to delete such information.</p>
                            <br />
                            <h2 className="text-xl font-medium title-font mb-4 text-gray-900">Changes to this Privacy Policy</h2>
                            <p>Pupbot may change this Privacy Policy from time to time. Laws, regulations and industry standards evolve, which may make those changes necessary, or we may make changes to our business. We will post the changes to this page and encourage you to review our Privacy Policy to stay informed. If we make changes that materially alter your privacy rights, Pupbot will provide additional notice, such as via email or through the Services. If you disagree with the changes to this Privacy Policy, you should deactivate your Services account. Contact the Customer if you wish to request the removal of Personal Data under their control.</p>
                            <br />
                            <h2 className="text-xl font-medium title-font mb-4 text-gray-900">International Data Transfers And Contractual Terms</h2>
                            <p className=" leading-relaxed text-base">Pupbot may transfer your Personal Data to countries other than the one in which you live. Pupbot offers European Union Model Clauses, also known as Standard Contractual Clauses, to meet the adequacy and security requirements for our Customers that operate in the European Union, and other international transfers of Customer Data. A copy of our standard data processing addendum, incorporating Model Clauses, is available <a href="/dpa">here</a>.</p>
                            <br />
                            <h2 className="text-xl font-medium title-font mb-4 text-gray-900">Data Protection Officer</h2>
                            <p className=" leading-relaxed text-base">To communicate with our Data Protection Officer, please email <a href="mailto:dpo@geekbot.io">dpo@geekbot.io</a>.</p>
                            <br />
                            <h2 className="text-xl font-medium title-font mb-4 text-gray-900">Identifying The Data Controller And Processor</h2>
                            <p className=" leading-relaxed text-base">Data protection law in certain jurisdictions differentiates between the “controller” and “processor” of information. In general, Customer is the controller of Customer Data. In general, Pupbot is the processor of Customer Data and the controller of Other Information. Pupbot Ltd, a Cypriot company based in Limassol, Cyprus, is the controller of Other Information and a processor of Customer Data relating to Authorized Users who use Standups established for Customers whether outside of or established in the U.S. and Canada.</p>
                            <br />
                            <h2 className="text-xl font-medium title-font mb-4 text-gray-900">Your Rights</h2>
                            <p className=" leading-relaxed text-base">Individuals located in certain countries, including the European Economic Area, have certain statutory rights in relation to their personal data. Subject to any exemptions provided by law, you may have the right to request access to Information, as well as to seek to update, delete or correct this Information. As your personal data is furnished by your company, we urge you to also contact your company or Team Leader (“Customer”) for additional access and assistance.</p>
                            <p className=" leading-relaxed text-base">To the extent that Pupbot’s processing of your Personal Data is subject to the General Data Protection Regulation, Pupbot relies on its legitimate interests, described above, to process your data. Pupbot may also process Other Information that constitutes your Personal Data for direct marketing purposes and you have a right to object to or opt-out from Pupbot’s use of your Personal Data for this purpose at any time, by contacting Pupbot at <a href="mailto:hey@geekbot.io">hey@geekbot.io</a>. In this context, Pupbot may refuse to proceed with any action relative to your Personal Data stored for reasons pertaining to its legal obligations, public safety as well as any other legal obligation to keep records and/or archives unaltered. Pupbot may though keep the Information you suggest in correction or alteration in a separate file, attachment or note connected with the Other Information collected. Pupbot may also legally refrain from responding to any requests if so required by law or instructed by a law enforcement agency or so ordered by a court of law.</p>
                            <br />
                            <h2 className="text-xl font-medium title-font mb-4 text-gray-900">Data Protection Authority</h2>
                            <p className=" leading-relaxed text-base">Subject to applicable law, you also have the right to (i) restrict Pupbot’s use of Other Information that constitutes your Personal Data and (ii) lodge a complaint with your local data protection authority or the Cypriot Data Protection Commissioner, which is Pupbot’s lead supervisory authority in the European Union. If you are a resident of the European Economic Area and believe we maintain your Personal Data within the scope of the General Data Protection Regulation (GDPR), you may direct questions or complaints to our lead supervisory authority:</p>
                            <p className="leading-relaxed text-base">	Ministry of Electronics & IT<br />
                                    (Government of India)<br />
                                Electronics Niketan, 6, CGO Complex,<br />
                                Lodhi Road, New Delhi-110003<br />
                                Email: <a href="mailto:	portal@digitalindia.gov.in" className="text-blue-500">portal@digitalindia.gov.in</a><br />
                                <a href="https://digitalindia.gov.in/" className="text-blue-500">www.digitalindia.gov.in</a> </p>
                            <br />
                            <h2 className="text-xl font-medium title-font mb-4 text-gray-900">Contacting Pupbot</h2>
                            <p className="leading-relaxed text-base">Please also feel free to contact Pupbot if you have any questions about this Privacy Policy or Pupbot’s practices, or if you are seeking to exercise any of your statutory rights. We urge you to use our client support/ communications app. Alternatively, you may contact us at <a href="mailto:hey@geekbot.io">hey@geekbot.io</a> or at our mailing address below:</p>
                            <p className=" leading-relaxed text-base">Pupbot, AltCampus<br />
                                Thehr, Dharamshala 176218<br />
                                    HP, India.</p>
                        </div>
                    </div>
                </section>

                <SignupSection />
                <Footer />
            </div>
        )
    }
}
export default PrivacyPolicy