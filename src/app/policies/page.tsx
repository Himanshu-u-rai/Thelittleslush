'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

type PolicySection = 'terms' | 'dmca' | 'trust' | 'privacy' | 'recommender';

export default function PoliciesPage() {
    const [activeSection, setActiveSection] = useState<PolicySection>('terms');

    const sections: { id: PolicySection; title: string; icon: string }[] = [
        { id: 'terms', title: 'Terms of Service', icon: '📜' },
        { id: 'dmca', title: 'DMCA', icon: '⚖️' },
        { id: 'trust', title: 'Trust & Safety', icon: '🛡️' },
        { id: 'privacy', title: 'Privacy Policy', icon: '🔒' },
        { id: 'recommender', title: 'Recommender Guidelines', icon: '📋' },
    ];

    return (
        <main className="policies-page">
            {/* Header */}
            <header className="policies-header">
                <Link href="/" className="policies-logo">
                    <Image src="/logo.png" alt="thelittleslush.fun" width={220} height={50} style={{ objectFit: 'contain', height: '40px', width: 'auto' }} priority />
                </Link>
                <h1 className="policies-title">User Policies</h1>
            </header>

            {/* Navigation Tabs */}
            <nav className="policies-nav">
                {sections.map((section) => (
                    <button
                        key={section.id}
                        className={`policy-tab ${activeSection === section.id ? 'active' : ''}`}
                        onClick={() => setActiveSection(section.id)}
                    >
                        <span className="tab-icon">{section.icon}</span>
                        <span className="tab-text">{section.title}</span>
                    </button>
                ))}
            </nav>

            {/* Content Area */}
            <div className="policies-content">
                {activeSection === 'terms' && <TermsOfService />}
                {activeSection === 'dmca' && <DMCAPolicy />}
                {activeSection === 'trust' && <TrustSafety />}
                {activeSection === 'privacy' && <PrivacyPolicy />}
                {activeSection === 'recommender' && <RecommenderGuidelines />}
            </div>

            {/* Back to Home */}
            <div className="policies-footer">
                <Link href="/" className="back-home-btn">
                    ← Back to Home
                </Link>
            </div>
        </main>
    );
}

function TermsOfService() {
    return (
        <div className="policy-section">
            <h2>Terms of Service</h2>
            <p className="last-updated">Last Updated: December 20, 2024</p>

            <div className="policy-block">
                <h3>1. Introduction and Acceptance</h3>
                <p>
                    Welcome to thelittleslush.fun ("the Site", "we", "us", or "our"). These Terms of Service
                    ("Terms") govern your access to and use of the Site, including any content, functionality,
                    and services offered on or through the Site.
                </p>
                <p>
                    By accessing or using the Site, you acknowledge that you have read, understood, and agree
                    to be bound by these Terms and our Privacy Policy. If you do not agree with any part of
                    these Terms, you must immediately discontinue use of the Site.
                </p>
                <p>
                    We reserve the right to modify these Terms at any time. Your continued use of the Site
                    following any changes constitutes your acceptance of the revised Terms. It is your
                    responsibility to review these Terms periodically for updates.
                </p>
            </div>

            <div className="policy-block highlight-block">
                <h3>2. Age Requirement and Verification</h3>
                <p>
                    <strong>THIS SITE CONTAINS ADULT CONTENT AND IS STRICTLY FOR ADULTS ONLY.</strong>
                </p>
                <p>
                    You must be at least 18 years old (or the age of majority in your jurisdiction, whichever
                    is higher) to access this Site. By accessing this Site, you represent and warrant that:
                </p>
                <ul>
                    <li>You are at least 18 years of age (or the legal age of majority in your jurisdiction)</li>
                    <li>You have the legal right to access adult content in your jurisdiction</li>
                    <li>Accessing adult content does not violate any applicable community standards in your area</li>
                    <li>You will not permit any minor to access this Site through your account or device</li>
                    <li>You understand that the content on this Site is of an adult, sexually explicit nature</li>
                </ul>
                <p>
                    We implement age verification measures including age gates and verification prompts. We
                    comply with applicable age verification laws including the UK Online Safety Act and EU
                    Digital Services Act requirements. We reserve the right to request additional age
                    verification at any time.
                </p>
            </div>

            <div className="policy-block">
                <h3>3. License and Access Rights</h3>
                <p>
                    Subject to your compliance with these Terms, we grant you a limited, non-exclusive,
                    non-transferable, revocable license to access and use the Site for personal,
                    non-commercial purposes only.
                </p>
                <p>This license does NOT include any right to:</p>
                <ul>
                    <li>Modify, copy, reproduce, or create derivative works from any content</li>
                    <li>Download, store, or redistribute content except as expressly permitted</li>
                    <li>Use any data mining, robots, or similar data gathering methods</li>
                    <li>Access the Site through any automated means (bots, scrapers, etc.)</li>
                    <li>Bypass, disable, or interfere with security features of the Site</li>
                    <li>Frame, mirror, or employ similar techniques on the Site</li>
                    <li>Reverse engineer, decompile, or disassemble any part of the Site</li>
                    <li>Use the Site for any commercial purpose without our express written consent</li>
                </ul>
            </div>

            <div className="policy-block">
                <h3>4. Content and Intellectual Property</h3>
                <h4>4.1 Third-Party Content</h4>
                <p>
                    The Site aggregates and embeds adult content from verified third-party platforms such as
                    RedGIFs. We do not host video content directly on our servers. All embedded content
                    remains the property of its respective owners and is subject to the hosting platform's
                    terms of service.
                </p>
                <h4>4.2 Site Content</h4>
                <p>
                    The Site design, logos, graphics, text, and other materials created by us ("Site Content")
                    are protected by copyright, trademark, and other intellectual property laws. You may not
                    use, copy, or distribute Site Content without our express written permission.
                </p>
                <h4>4.3 Trademarks</h4>
                <p>
                    "thelittleslush.fun" and associated logos are trademarks of our organization. All other
                    trademarks appearing on the Site are the property of their respective owners.
                </p>
            </div>

            <div className="policy-block">
                <h3>5. Acceptable Use Policy</h3>
                <p>
                    This Acceptable Use Policy supplements the Terms and outlines prohibited activities.
                    You agree NOT to:
                </p>
                <h4>5.1 Prohibited Content</h4>
                <ul>
                    <li>Upload, post, or transmit any content depicting minors in any context whatsoever</li>
                    <li>Share content that is illegal under applicable law</li>
                    <li>Post non-consensual intimate images or "revenge pornography"</li>
                    <li>Share content involving exploitation, trafficking, or coercion</li>
                    <li>Distribute content promoting violence, self-harm, or illegal activities</li>
                    <li>Post hateful, discriminatory, or harassing content based on race, gender, sexuality, religion, or other protected characteristics</li>
                    <li>Share content depicting bestiality, necrophilia, or other illegal sexual acts</li>
                    <li>Upload deepfake pornographic content without explicit disclosure and consent</li>
                </ul>
                <h4>5.2 Prohibited Conduct</h4>
                <ul>
                    <li>Harass, threaten, stalk, or intimidate other users</li>
                    <li>Impersonate any person, entity, or falsely claim affiliation</li>
                    <li>Engage in spamming, phishing, or fraudulent activities</li>
                    <li>Attempt to circumvent security measures or access controls</li>
                    <li>Interfere with or disrupt the Site's operations</li>
                    <li>Collect or store personal data about other users</li>
                    <li>Use offensive, vulgar, or inappropriate usernames</li>
                    <li>Engage in any activity that could damage our reputation</li>
                </ul>
                <p>
                    <strong>Consequences:</strong> Violations may result in immediate suspension or termination
                    of access, content removal, and referral to law enforcement where appropriate.
                </p>
            </div>

            <div className="policy-block">
                <h3>6. User Responsibilities</h3>
                <p>As a user of this Site, you are responsible for:</p>
                <ul>
                    <li>Ensuring you meet the age requirements to access adult content</li>
                    <li>Maintaining the security of your device and any accounts</li>
                    <li>All activities that occur under your access</li>
                    <li>Complying with all applicable local, state, national, and international laws</li>
                    <li>Ensuring minors cannot access the Site through your device</li>
                    <li>Using parental control software if children have access to your devices</li>
                </ul>
            </div>

            <div className="policy-block">
                <h3>7. Third-Party Links and Services</h3>
                <p>
                    The Site may contain links to third-party websites, advertisements, or services that are
                    not owned or controlled by us. We have no control over and assume no responsibility for
                    the content, privacy policies, or practices of any third-party sites or services.
                </p>
                <p>
                    Your interactions with third-party sites are governed by those sites' own terms and
                    policies. We strongly recommend reviewing the terms of any third-party site before
                    engaging with it.
                </p>
            </div>

            <div className="policy-block">
                <h3>8. Disclaimer of Warranties</h3>
                <p>
                    THE SITE AND ALL CONTENT ARE PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES
                    OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO:
                </p>
                <ul>
                    <li>Implied warranties of merchantability and fitness for a particular purpose</li>
                    <li>Warranties of title or non-infringement</li>
                    <li>Warranties that the Site will be uninterrupted, error-free, or secure</li>
                    <li>Warranties that the Site will be free of viruses or harmful components</li>
                    <li>Warranties regarding the accuracy, reliability, or completeness of content</li>
                </ul>
                <p>
                    Much of the content displayed is user-generated and has not been reviewed or approved
                    by us. You access and view content at your own risk.
                </p>
            </div>

            <div className="policy-block">
                <h3>9. Limitation of Liability</h3>
                <p>
                    TO THE MAXIMUM EXTENT PERMITTED BY LAW, WE SHALL NOT BE LIABLE FOR ANY INDIRECT,
                    INCIDENTAL, SPECIAL, CONSEQUENTIAL, PUNITIVE, OR EXEMPLARY DAMAGES, INCLUDING BUT
                    NOT LIMITED TO DAMAGES FOR:
                </p>
                <ul>
                    <li>Loss of profits, goodwill, or data</li>
                    <li>Cost of substitute services</li>
                    <li>Any matters beyond our reasonable control</li>
                    <li>Any actions taken in response to violations of these Terms</li>
                </ul>
                <p>
                    IN NO EVENT SHALL OUR TOTAL LIABILITY EXCEED THE AMOUNT YOU PAID US IN THE PAST
                    TWELVE MONTHS, OR $100 USD, WHICHEVER IS LESS.
                </p>
            </div>

            <div className="policy-block">
                <h3>10. Indemnification</h3>
                <p>
                    You agree to indemnify, defend, and hold harmless the Site, its operators, affiliates,
                    and their respective officers, directors, employees, and agents from any claims,
                    liabilities, damages, losses, costs, or expenses (including reasonable attorneys' fees)
                    arising from:
                </p>
                <ul>
                    <li>Your use of the Site</li>
                    <li>Your violation of these Terms</li>
                    <li>Your violation of any third-party rights</li>
                    <li>Any content you submit or transmit through the Site</li>
                </ul>
            </div>

            <div className="policy-block">
                <h3>11. Termination</h3>
                <p>
                    We reserve the right to suspend or terminate your access to the Site at any time,
                    without notice, for any reason, including but not limited to violation of these Terms.
                    Upon termination, all licenses and rights granted to you will immediately cease.
                </p>
            </div>

            <div className="policy-block">
                <h3>12. Governing Law and Dispute Resolution</h3>
                <p>
                    These Terms shall be governed by and construed in accordance with applicable laws,
                    without regard to conflict of law principles. Any disputes arising from these Terms
                    or your use of the Site shall be resolved through binding arbitration, except where
                    prohibited by law.
                </p>
            </div>

            <div className="policy-block">
                <h3>13. Severability</h3>
                <p>
                    If any provision of these Terms is found to be unenforceable or invalid, that provision
                    shall be limited or eliminated to the minimum extent necessary, and the remaining
                    provisions shall continue in full force and effect.
                </p>
            </div>

            <div className="policy-block">
                <h3>14. Contact Information</h3>
                <p>
                    For questions, concerns, or notices regarding these Terms of Service, please contact us at:
                </p>
                <div className="contact-box">
                    <p><strong>Legal Department</strong></p>
                    <p>Email: <a href="mailto:legal@thelittleslush.fun">legal@thelittleslush.fun</a></p>
                </div>
            </div>
        </div>
    );
}

function DMCAPolicy() {
    return (
        <div className="policy-section">
            <h2>DMCA Policy</h2>
            <p className="last-updated">Last Updated: December 20, 2024</p>

            <div className="policy-block">
                <h3>Digital Millennium Copyright Act Notice</h3>
                <p>
                    thelittleslush.fun ("the Site") respects the intellectual property rights of others and
                    expects users of our services to do the same. We are committed to responding expeditiously
                    to claims of copyright infringement in accordance with the Digital Millennium Copyright Act
                    of 1998 ("DMCA").
                </p>
                <p>
                    This policy outlines our procedures for addressing copyright infringement claims and
                    explains how to submit a proper DMCA notification or counter-notification.
                </p>
            </div>

            <div className="policy-block highlight-block">
                <h3>Important: Content Hosting Disclaimer</h3>
                <p>
                    <strong>thelittleslush.fun does NOT directly host any video or image content.</strong>
                </p>
                <p>
                    All media displayed on our Site is embedded from third-party platforms such as RedGIFs,
                    which maintain their own comprehensive content moderation and DMCA compliance procedures.
                    The content remains hosted on these third-party servers.
                </p>
                <p>
                    <strong>If you believe your copyrighted content is being infringed, you should FIRST
                        contact the hosting platform directly:</strong>
                </p>
                <ul>
                    <li><strong>RedGIFs DMCA:</strong> Submit through RedGIFs' official DMCA process at redgifs.com</li>
                    <li>Content removed from the hosting platform will automatically no longer be accessible through our Site</li>
                </ul>
                <p>
                    If content has been removed from the source platform but is still appearing on our Site,
                    please contact us to refresh our cache.
                </p>
            </div>

            <div className="policy-block">
                <h3>Filing a DMCA Takedown Notice</h3>
                <p>
                    If you are a copyright owner (or authorized agent) and believe that content accessible
                    through our Site infringes your copyright, you may submit a DMCA takedown notification.
                    To be effective, your notification must be in writing and include:
                </p>
                <ul>
                    <li>
                        <strong>Physical or electronic signature</strong> of the copyright owner or a person
                        authorized to act on their behalf
                    </li>
                    <li>
                        <strong>Identification of the copyrighted work</strong> claimed to have been infringed.
                        If multiple works are covered by a single notification, provide a representative list
                    </li>
                    <li>
                        <strong>Identification of the infringing material</strong> and information reasonably
                        sufficient to locate the material on our Site (specific URLs are required)
                    </li>
                    <li>
                        <strong>Your contact information:</strong> including your name, mailing address,
                        telephone number, and email address
                    </li>
                    <li>
                        <strong>Good faith statement:</strong> A statement that you have a good faith belief
                        that the use of the material is not authorized by the copyright owner, its agent, or the law
                    </li>
                    <li>
                        <strong>Accuracy statement:</strong> A statement, made under penalty of perjury, that
                        the information in the notification is accurate and that you are authorized to act
                        on behalf of the copyright owner
                    </li>
                </ul>
            </div>

            <div className="policy-block">
                <h3>Designated DMCA Agent</h3>
                <p>
                    DMCA takedown notices should be submitted to our designated agent:
                </p>
                <div className="contact-box">
                    <p><strong>DMCA Agent</strong></p>
                    <p><strong>thelittleslush.fun</strong></p>
                    <p>Email: <a href="mailto:dmca@thelittleslush.fun">dmca@thelittleslush.fun</a></p>
                    <p><em>Subject Line: DMCA Takedown Notice</em></p>
                </div>
                <p>
                    <strong>Response Time:</strong> We aim to process all valid DMCA notices within 24-48
                    business hours. Upon receipt of a valid notice, we will expeditiously remove or disable
                    access to the allegedly infringing material.
                </p>
            </div>

            <div className="policy-block">
                <h3>Counter-Notification Procedure</h3>
                <p>
                    If you believe that content you posted was wrongly removed or disabled as a result of
                    a DMCA notice, you may file a counter-notification. Your counter-notification must include:
                </p>
                <ul>
                    <li>Your physical or electronic signature</li>
                    <li>Identification of the material that was removed and its location before removal</li>
                    <li>
                        A statement under penalty of perjury that you have a good faith belief that the material
                        was removed or disabled as a result of mistake or misidentification
                    </li>
                    <li>Your name, address, and telephone number</li>
                    <li>
                        A statement that you consent to the jurisdiction of the Federal District Court for the
                        judicial district in which your address is located, and that you will accept service of
                        process from the person who provided the original DMCA notification
                    </li>
                </ul>
                <p>
                    Upon receipt of a valid counter-notification, we will forward it to the original
                    complaining party. If we do not receive notice of a court action within 10-14 business
                    days, we may restore the material.
                </p>
            </div>

            <div className="policy-block">
                <h3>Repeat Infringer Policy</h3>
                <p>
                    In accordance with the DMCA and other applicable laws, we maintain a policy of terminating,
                    in appropriate circumstances, users who are deemed repeat infringers. We may also, at our
                    sole discretion, limit access or terminate access for users who infringe the intellectual
                    property rights of others, whether or not there is any repeat infringement.
                </p>
            </div>

            <div className="policy-block">
                <h3>Misrepresentation Warning</h3>
                <p>
                    <strong>Please be aware:</strong> Under Section 512(f) of the DMCA, any person who knowingly
                    materially misrepresents that material is infringing, or that material was removed or
                    disabled by mistake or misidentification, may be subject to liability for damages,
                    including costs and attorneys' fees.
                </p>
                <p>
                    Before submitting a DMCA notice, please ensure that you are the copyright owner or
                    authorized to act on their behalf, and that the use of the material is not protected
                    by fair use or other legal doctrines.
                </p>
            </div>

            <div className="policy-block">
                <h3>Content Removal for Depicted Individuals</h3>
                <p>
                    If you are depicted in content and wish to have it removed (regardless of copyright
                    ownership), please see our Trust & Safety section for content removal requests. We
                    take privacy and consent seriously and have separate procedures for these requests.
                </p>
            </div>
        </div>
    );
}

function TrustSafety() {
    return (
        <div className="policy-section">
            <h2>Trust & Safety</h2>
            <p className="last-updated">Last Updated: December 20, 2024</p>

            <div className="policy-block">
                <h3>Our Commitment to Safety</h3>
                <p>
                    At thelittleslush.fun, we are deeply committed to providing a safe, legal, and consensual
                    adult entertainment experience. The safety of our users and the protection of all
                    individuals—especially vulnerable populations—is our highest priority.
                </p>
                <p>
                    We work diligently to ensure that all content accessible through our platform comes from
                    verified, reputable sources that maintain rigorous content policies and verification procedures.
                </p>
            </div>

            <div className="policy-block highlight-block">
                <h3>🚫 Zero Tolerance Policies</h3>
                <p>
                    We maintain an absolute <strong>ZERO TOLERANCE</strong> policy for the following. Any
                    content falling into these categories will be immediately removed and reported to
                    appropriate authorities:
                </p>
                <ul>
                    <li>
                        <strong>Child Sexual Abuse Material (CSAM):</strong> Any content depicting, suggesting,
                        or involving minors in any sexual context is strictly prohibited. This includes
                        real imagery, computer-generated imagery, drawings, or any other depictions.
                        Violations will be reported to the National Center for Missing & Exploited Children
                        (NCMEC) and law enforcement.
                    </li>
                    <li>
                        <strong>Non-Consensual Content:</strong> Any intimate imagery shared without the
                        consent of all depicted individuals, including "revenge pornography" or content
                        obtained through hacking, theft, or coercion.
                    </li>
                    <li>
                        <strong>Human Trafficking & Exploitation:</strong> Any content connected to human
                        trafficking, sexual exploitation, forced labor, or any form of modern slavery.
                    </li>
                    <li>
                        <strong>Sexual Violence:</strong> Real depictions of rape, sexual assault, or any
                        non-consensual sexual activity.
                    </li>
                    <li>
                        <strong>Extreme Violence:</strong> Real violence, torture, abuse, mutilation, or
                        content depicting serious physical harm.
                    </li>
                    <li>
                        <strong>Bestiality:</strong> Any sexual content involving animals.
                    </li>
                    <li>
                        <strong>Necrophilia:</strong> Any sexual content involving deceased individuals.
                    </li>
                </ul>
            </div>

            <div className="policy-block">
                <h3>Content Sourcing & Verification</h3>
                <p>
                    All content displayed on our platform is sourced exclusively from verified third-party
                    platforms that maintain comprehensive content moderation and creator verification systems.
                    We only embed content from sources that:
                </p>
                <ul>
                    <li>
                        <strong>Age Verification:</strong> Verify that all content creators and depicted
                        individuals are at least 18 years of age
                    </li>
                    <li>
                        <strong>Identity Verification:</strong> Require government-issued identification
                        from content creators
                    </li>
                    <li>
                        <strong>Consent Documentation:</strong> Maintain records of consent from all
                        individuals depicted in content
                    </li>
                    <li>
                        <strong>Active Moderation:</strong> Employ both automated (AI) and human content
                        moderation teams to review uploaded content
                    </li>
                    <li>
                        <strong>Compliance Programs:</strong> Maintain compliance with applicable laws
                        including 18 U.S.C. § 2257 record-keeping requirements
                    </li>
                    <li>
                        <strong>Responsive Removal:</strong> Have established procedures for expeditious
                        removal of violating content
                    </li>
                </ul>
            </div>

            <div className="policy-block">
                <h3>Community Guidelines</h3>
                <p>
                    In addition to zero tolerance content, the following is also prohibited on our platform:
                </p>
                <ul>
                    <li>
                        <strong>Racist or Discriminatory Content:</strong> Content promoting hatred based on
                        race, ethnicity, religion, gender, sexual orientation, disability, or other protected
                        characteristics
                    </li>
                    <li>
                        <strong>Deceptive Deepfakes:</strong> AI-generated or manipulated content that
                        falsely depicts real individuals without clear disclosure and consent
                    </li>
                    <li>
                        <strong>Harassment & Doxxing:</strong> Content intended to harass, threaten,
                        intimidate, or expose personal information of individuals
                    </li>
                    <li>
                        <strong>Illegal Activities:</strong> Content depicting or promoting illegal activities
                        such as drug use, weapons violations, or other criminal acts
                    </li>
                    <li>
                        <strong>Spam & Inauthentic Behavior:</strong> Automated posting, bot activity, or
                        coordinated inauthentic behavior
                    </li>
                    <li>
                        <strong>Malware & Phishing:</strong> Content or links designed to harm users'
                        devices or steal personal information
                    </li>
                </ul>
            </div>

            <div className="policy-block">
                <h3>Reporting Illegal or Harmful Content</h3>
                <p>
                    If you encounter any content that you believe violates our policies, depicts illegal
                    activity, or involves the exploitation of any individual, please report it immediately:
                </p>
                <div className="contact-box">
                    <p><strong>Trust & Safety Team</strong></p>
                    <p>Email: <a href="mailto:safety@thelittleslush.fun">safety@thelittleslush.fun</a></p>
                    <p><strong>Include in your report:</strong></p>
                    <ul>
                        <li>The specific URL(s) of the concerning content</li>
                        <li>A description of the violation or concern</li>
                        <li>Any additional context that may help our review</li>
                    </ul>
                </div>
                <p>
                    <strong>Response Time:</strong> We aim to review and action all reports within 24 hours.
                    Critical reports involving minors or imminent harm are prioritized for immediate review.
                </p>
            </div>

            <div className="policy-block">
                <h3>Reporting to Authorities</h3>
                <p>
                    For content involving potential criminal activity, especially content involving minors,
                    we will:
                </p>
                <ul>
                    <li>
                        Immediately report to the <strong>National Center for Missing & Exploited Children
                            (NCMEC)</strong> through their CyberTipline
                    </li>
                    <li>
                        Preserve all relevant evidence as required by law
                    </li>
                    <li>
                        Cooperate fully with law enforcement investigations
                    </li>
                    <li>
                        Remove the content from our platform expeditiously
                    </li>
                </ul>
            </div>

            <div className="policy-block">
                <h3>Content Removal Requests</h3>
                <h4>For Depicted Individuals:</h4>
                <p>
                    If you are depicted in content on our platform and wish to have it removed, you have
                    the right to request removal. Please contact us with:
                </p>
                <ul>
                    <li>Specific URLs of the content in question</li>
                    <li>Proof of identity (government-issued ID with personal details redacted)</li>
                    <li>A signed statement confirming you are the individual depicted</li>
                </ul>
                <p>
                    Since we embed content from third parties, we will also direct you to the hosting
                    platform's removal process to ensure complete removal from the source.
                </p>

                <h4>For Other Removal Requests:</h4>
                <p>
                    For copyright claims, please see our DMCA Policy. For other legal removal requests,
                    please contact our legal team.
                </p>
            </div>

            <div className="policy-block">
                <h3>Age Verification & Access Controls</h3>
                <p>
                    We implement multiple measures to prevent minors from accessing adult content:
                </p>
                <ul>
                    <li>
                        <strong>Age Gate:</strong> All visitors must confirm they are 18+ before accessing content
                    </li>
                    <li>
                        <strong>Compliance:</strong> We comply with applicable age verification laws including
                        the UK Online Safety Act and EU Digital Services Act
                    </li>
                    <li>
                        <strong>Parental Controls:</strong> We recommend parents and guardians use parental
                        control software to restrict access to adult content
                    </li>
                    <li>
                        <strong>META Tags:</strong> Our site is tagged as adult content for filtering by
                        parental control software and search engines
                    </li>
                </ul>
            </div>

            <div className="policy-block">
                <h3>Cooperation with Law Enforcement</h3>
                <p>
                    We fully cooperate with law enforcement agencies investigating illegal activities.
                    We will:
                </p>
                <ul>
                    <li>Respond to valid legal requests and court orders</li>
                    <li>Preserve evidence when legally required or when we become aware of potential crimes</li>
                    <li>Provide information to authorities as permitted or required by law</li>
                    <li>Maintain records as required by applicable recordkeeping laws</li>
                </ul>
            </div>

            <div className="policy-block">
                <h3>Transparency</h3>
                <p>
                    We are committed to transparency about our content moderation practices. We regularly
                    review and update our policies to reflect best practices in trust and safety, evolving
                    legal requirements, and feedback from our community.
                </p>
                <p>
                    Questions about our Trust & Safety practices can be directed to:
                    <a href="mailto:safety@thelittleslush.fun">safety@thelittleslush.fun</a>
                </p>
            </div>
        </div>
    );
}

function PrivacyPolicy() {
    return (
        <div className="policy-section">
            <h2>Privacy Policy</h2>
            <p className="last-updated">Last Updated: December 20, 2024</p>

            <div className="policy-block">
                <h3>1. Introduction</h3>
                <p>
                    This Privacy Policy explains how thelittleslush.fun ("we", "our", "us", or "the Site")
                    collects, uses, shares, and protects your personal information when you access or use
                    our website and services.
                </p>
                <p>
                    By using our Site, you consent to the data practices described in this policy. If you
                    do not agree with these practices, please do not use our Site.
                </p>
                <p>
                    We are committed to protecting your privacy and handling your data responsibly. Given
                    the adult nature of our Site, we understand the particular importance of privacy to
                    our users.
                </p>
            </div>

            <div className="policy-block">
                <h3>2. Information We Collect</h3>

                <h4>2.1 Information Collected Automatically</h4>
                <p>When you visit our Site, we automatically collect certain information, including:</p>
                <ul>
                    <li><strong>Device Information:</strong> Device type, operating system, browser type and version</li>
                    <li><strong>Usage Data:</strong> Pages visited, time spent on pages, clicks, scrolling behavior</li>
                    <li><strong>Network Information:</strong> IP address (which may be anonymized), ISP, general geographic location</li>
                    <li><strong>Referral Data:</strong> The website that referred you to our Site</li>
                    <li><strong>Technical Data:</strong> Screen resolution, language preferences, time zone</li>
                </ul>

                <h4>2.2 Cookies and Tracking Technologies</h4>
                <p>We use cookies and similar technologies to:</p>
                <ul>
                    <li><strong>Essential Cookies:</strong> Enable core functionality like age verification storage and session management</li>
                    <li><strong>Performance Cookies:</strong> Collect anonymous analytics data to improve the Site</li>
                    <li><strong>Advertising Cookies:</strong> Used by our advertising partners to serve relevant ads</li>
                    <li><strong>Preference Cookies:</strong> Remember your settings and preferences</li>
                </ul>
                <p>
                    You can manage cookie preferences through your browser settings. Note that disabling
                    certain cookies may affect Site functionality.
                </p>

                <h4>2.3 Information from Third Parties</h4>
                <p>
                    We may receive information from third-party services including analytics providers
                    and advertising networks.
                </p>
            </div>

            <div className="policy-block">
                <h3>3. How We Use Your Information</h3>
                <p>We use the collected information for the following purposes:</p>
                <ul>
                    <li><strong>Site Operation:</strong> To provide, maintain, and improve our services</li>
                    <li><strong>Age Verification:</strong> To comply with legal requirements for age verification</li>
                    <li><strong>Analytics:</strong> To understand how users interact with our Site and identify improvements</li>
                    <li><strong>Advertising:</strong> To display relevant advertisements that support our free service</li>
                    <li><strong>Security:</strong> To detect, prevent, and address fraud, abuse, and security issues</li>
                    <li><strong>Legal Compliance:</strong> To comply with applicable laws, regulations, and legal processes</li>
                    <li><strong>Communication:</strong> To respond to your inquiries and provide support</li>
                </ul>
            </div>

            <div className="policy-block">
                <h3>4. Legal Basis for Processing (EU/UK Users)</h3>
                <p>If you are in the European Union or United Kingdom, our legal bases for processing include:</p>
                <ul>
                    <li><strong>Consent:</strong> For cookies and certain data processing activities</li>
                    <li><strong>Legitimate Interests:</strong> For analytics, security, and service improvement</li>
                    <li><strong>Legal Obligation:</strong> For compliance with age verification and other legal requirements</li>
                    <li><strong>Contract Performance:</strong> To provide services you request</li>
                </ul>
            </div>

            <div className="policy-block">
                <h3>5. Information Sharing and Disclosure</h3>
                <p>We may share your information with:</p>

                <h4>5.1 Service Providers</h4>
                <ul>
                    <li>Hosting and infrastructure providers</li>
                    <li>Analytics services (e.g., Google Analytics)</li>
                    <li>Content delivery networks</li>
                </ul>

                <h4>5.2 Advertising Partners</h4>
                <p>
                    We work with advertising networks to display ads on our Site. These partners may
                    use cookies to serve ads based on your interests. We do not share personally
                    identifiable information with advertisers.
                </p>

                <h4>5.3 Legal Requirements</h4>
                <p>We may disclose information:</p>
                <ul>
                    <li>To comply with legal obligations or valid legal requests</li>
                    <li>To protect our rights, privacy, safety, or property</li>
                    <li>To investigate suspected violations of our Terms of Service</li>
                    <li>In emergency situations involving potential threats to safety</li>
                </ul>

                <h4>5.4 Business Transfers</h4>
                <p>
                    In the event of a merger, acquisition, or sale of assets, user information may be
                    transferred as part of the transaction.
                </p>
            </div>

            <div className="policy-block">
                <h3>6. Third-Party Content and Services</h3>
                <p>
                    Our Site embeds content from third-party platforms (such as RedGIFs) and contains
                    advertisements from third-party networks. These third parties have their own privacy
                    policies that govern their collection and use of data.
                </p>
                <p>
                    We encourage you to review the privacy policies of:
                </p>
                <ul>
                    <li>Content hosting platforms whose content is embedded on our Site</li>
                    <li>Advertising networks that display ads on our Site</li>
                    <li>Any third-party websites you visit from links on our Site</li>
                </ul>
                <p>
                    We are not responsible for the privacy practices of these third parties.
                </p>
            </div>

            <div className="policy-block">
                <h3>7. Data Retention</h3>
                <p>
                    We retain personal information only for as long as necessary to fulfill the purposes
                    for which it was collected, or as required by law:
                </p>
                <ul>
                    <li><strong>Age Verification:</strong> Stored locally in your browser; not retained on our servers</li>
                    <li><strong>Analytics Data:</strong> Anonymized and aggregated data may be retained indefinitely</li>
                    <li><strong>Server Logs:</strong> Typically retained for 90 days for security purposes</li>
                    <li><strong>Legal Records:</strong> Retained as required by applicable law</li>
                </ul>
            </div>

            <div className="policy-block">
                <h3>8. Your Rights</h3>
                <p>Depending on your location, you may have the following rights:</p>

                <h4>8.1 All Users</h4>
                <ul>
                    <li>Opt out of cookies through browser settings</li>
                    <li>Request information about our data practices</li>
                    <li>Report privacy concerns</li>
                </ul>

                <h4>8.2 EU/UK Users (GDPR)</h4>
                <ul>
                    <li><strong>Right of Access:</strong> Request a copy of your personal data</li>
                    <li><strong>Right to Rectification:</strong> Request correction of inaccurate data</li>
                    <li><strong>Right to Erasure:</strong> Request deletion of your personal data</li>
                    <li><strong>Right to Restrict Processing:</strong> Request limitation of data processing</li>
                    <li><strong>Right to Data Portability:</strong> Receive your data in a portable format</li>
                    <li><strong>Right to Object:</strong> Object to certain types of processing</li>
                    <li><strong>Right to Withdraw Consent:</strong> Withdraw previously given consent</li>
                </ul>

                <h4>8.3 California Users (CCPA)</h4>
                <ul>
                    <li>Right to know what personal information is collected</li>
                    <li>Right to delete personal information</li>
                    <li>Right to opt-out of the sale of personal information</li>
                    <li>Right to non-discrimination for exercising your rights</li>
                </ul>
                <p>
                    Note: We do not sell personal information as defined by the CCPA.
                </p>
            </div>

            <div className="policy-block">
                <h3>9. Data Security</h3>
                <p>
                    We implement appropriate technical and organizational measures to protect your
                    personal information, including:
                </p>
                <ul>
                    <li>HTTPS encryption for all data transmission</li>
                    <li>Regular security assessments and updates</li>
                    <li>Access controls limiting who can access personal data</li>
                    <li>Secure infrastructure and hosting</li>
                </ul>
                <p>
                    However, no method of transmission over the internet or electronic storage is 100%
                    secure. We cannot guarantee absolute security.
                </p>
            </div>

            <div className="policy-block">
                <h3>10. Children's Privacy</h3>
                <p>
                    Our Site is strictly for adults 18 years of age and older. We do not knowingly collect
                    personal information from anyone under 18 years of age. If we learn that we have
                    collected personal information from a minor, we will take immediate steps to delete
                    that information.
                </p>
                <p>
                    If you believe a minor has provided us with personal information, please contact us
                    immediately at <a href="mailto:privacy@thelittleslush.fun">privacy@thelittleslush.fun</a>
                </p>
            </div>

            <div className="policy-block">
                <h3>11. International Data Transfers</h3>
                <p>
                    Your information may be transferred to and processed in countries other than your
                    country of residence. These countries may have different data protection laws. By
                    using our Site, you consent to the transfer of your information to these countries.
                </p>
                <p>
                    For EU/UK users, we ensure appropriate safeguards are in place for international
                    transfers as required by GDPR.
                </p>
            </div>

            <div className="policy-block">
                <h3>12. Do Not Track Signals</h3>
                <p>
                    Our Site does not currently respond to "Do Not Track" signals from browsers. However,
                    you can manage your privacy preferences through cookie settings and browser controls.
                </p>
            </div>

            <div className="policy-block">
                <h3>13. Changes to This Policy</h3>
                <p>
                    We may update this Privacy Policy from time to time to reflect changes in our practices,
                    technology, legal requirements, or other factors. We will update the "Last Updated" date
                    at the top of this policy and, for significant changes, may provide additional notice.
                </p>
                <p>
                    Your continued use of the Site after any changes constitutes your acceptance of the
                    updated policy.
                </p>
            </div>

            <div className="policy-block">
                <h3>14. Contact Us</h3>
                <p>For privacy-related questions, concerns, or to exercise your rights, please contact:</p>
                <div className="contact-box">
                    <p><strong>Privacy Team</strong></p>
                    <p>Email: <a href="mailto:privacy@thelittleslush.fun">privacy@thelittleslush.fun</a></p>
                </div>
                <p>
                    We will respond to your inquiry within 30 days, or sooner as required by applicable law.
                </p>
            </div>
        </div>
    );
}

function RecommenderGuidelines() {
    return (
        <div className="policy-section">
            <h2>Recommender System Guidelines</h2>
            <p className="last-updated">Last Updated: December 20, 2024</p>

            <div className="policy-block">
                <h3>Introduction</h3>
                <p>
                    This document explains how thelittleslush.fun selects, curates, and presents content
                    to users. In accordance with transparency requirements under the EU Digital Services
                    Act and our commitment to user empowerment, we provide this detailed explanation of
                    our recommender system.
                </p>
                <p>
                    We believe users should understand how content is selected for display and what factors
                    influence the content they see.
                </p>
            </div>

            <div className="policy-block">
                <h3>Content Sourcing</h3>
                <p>
                    Content displayed on our platform is aggregated from verified third-party adult content
                    platforms. We embed content from sources that have:
                </p>
                <ul>
                    <li>Established verification procedures for content creators</li>
                    <li>Active content moderation systems</li>
                    <li>DMCA compliance processes</li>
                    <li>Age verification requirements for creators</li>
                    <li>Consent documentation requirements</li>
                </ul>
                <p>
                    We do not host content directly; all videos and images remain hosted on the source platforms.
                </p>
            </div>

            <div className="policy-block">
                <h3>How Content is Ranked and Displayed</h3>
                <p>
                    Our recommender system uses the following criteria to select and order content on the
                    main feed:
                </p>

                <h4>Primary Ranking Factors:</h4>
                <ul>
                    <li>
                        <strong>Recency:</strong> Newer content is prioritized to ensure fresh content
                        appears in the feed. This encourages discovery of new material.
                    </li>
                    <li>
                        <strong>Popularity:</strong> Content that has received more views, likes, or engagement
                        on the source platform may be ranked higher.
                    </li>
                    <li>
                        <strong>Category/Tags:</strong> Content is categorized by tags and categories. When
                        you apply a filter, only content matching that category is displayed.
                    </li>
                    <li>
                        <strong>Technical Quality:</strong> Higher resolution content and content with good
                        technical quality may receive preference.
                    </li>
                </ul>

                <h4>Secondary Factors:</h4>
                <ul>
                    <li>
                        <strong>Content Duration:</strong> A mix of short and longer-form content is maintained
                    </li>
                    <li>
                        <strong>Diversity:</strong> We aim to show variety to prevent repetitive content
                    </li>
                    <li>
                        <strong>Source Reliability:</strong> Content from verified premium creators may be featured
                    </li>
                </ul>
            </div>

            <div className="policy-block highlight-block">
                <h3>🔒 Privacy Protection: What We DO NOT Do</h3>
                <p>
                    To protect your privacy, our recommender system specifically DOES NOT:
                </p>
                <ul>
                    <li>
                        <strong>Create Personal Profiles:</strong> We do not build individual user profiles
                        based on viewing history
                    </li>
                    <li>
                        <strong>Track Viewing History:</strong> We do not store what content you have viewed
                        across sessions
                    </li>
                    <li>
                        <strong>Use Machine Learning Personalization:</strong> We do not employ ML models
                        to predict your individual preferences
                    </li>
                    <li>
                        <strong>Share Data for Recommendations:</strong> We do not share viewing data with
                        third parties for recommendation purposes
                    </li>
                    <li>
                        <strong>Use Behavioral Targeting:</strong> We do not modify feed based on your
                        past browsing behavior
                    </li>
                    <li>
                        <strong>Implement Addictive Patterns:</strong> We do not use dark patterns designed
                        to maximize addictive engagement
                    </li>
                </ul>
                <p>
                    <strong>Result:</strong> Every user sees the same content feed (except when filtered
                    by search or category). Your experience is not influenced by past behavior on our Site.
                </p>
            </div>

            <div className="policy-block">
                <h3>User Controls</h3>
                <p>
                    You have the following controls over what content you see:
                </p>

                <h4>Search Function</h4>
                <p>
                    Use the search bar to find specific content by keywords. Results are ranked by
                    relevance to your search terms combined with popularity and recency.
                </p>

                <h4>Category Filters</h4>
                <p>
                    Click on category tags (shown below the header) to filter content to specific
                    categories. Only content tagged with that category will be displayed.
                </p>

                <h4>Clear Filters</h4>
                <p>
                    Click "Clear" or the site logo to reset all filters and return to the default
                    content feed.
                </p>

                <h4>Infinite Scroll</h4>
                <p>
                    Continue scrolling to load more content. The system will continue providing
                    content based on the same ranking criteria.
                </p>
            </div>

            <div className="policy-block">
                <h3>Content Moderation in Recommendations</h3>
                <p>
                    Before content appears in our feed, it must pass through multiple checks:
                </p>
                <ul>
                    <li>
                        <strong>Source Platform Moderation:</strong> All content has been moderated by
                        the hosting platform before we can embed it
                    </li>
                    <li>
                        <strong>Category Compliance:</strong> Content is checked to ensure proper
                        categorization and tagging
                    </li>
                    <li>
                        <strong>Policy Compliance:</strong> Content that violates our Trust & Safety
                        policies is not displayed
                    </li>
                    <li>
                        <strong>Report Response:</strong> Content reported by users is reviewed and may
                        be removed from recommendations
                    </li>
                </ul>
            </div>

            <div className="policy-block">
                <h3>Advertising in the Feed</h3>
                <p>
                    Advertisements may appear within the content feed. These ads are:
                </p>
                <ul>
                    <li>
                        <strong>Clearly Labeled:</strong> Advertisements are distinguished from organic
                        content through visual styling and/or labels
                    </li>
                    <li>
                        <strong>Third-Party Served:</strong> Ads are served by advertising networks, not
                        selected by our recommender system
                    </li>
                    <li>
                        <strong>Contextually Targeted:</strong> Ads are targeted based on the general
                        nature of our Site, not your personal activity
                    </li>
                    <li>
                        <strong>Policy Compliant:</strong> All advertisements must comply with applicable
                        advertising standards
                    </li>
                </ul>
            </div>

            <div className="policy-block">
                <h3>Trending and Featured Content</h3>
                <p>
                    Some content may be labeled as "Premium" or "Featured." This content:
                </p>
                <ul>
                    <li>May be promotional or sponsored content</li>
                    <li>Comes from verified premium creators</li>
                    <li>Is clearly labeled when it is paid promotion</li>
                    <li>Still complies with all content policies</li>
                </ul>
            </div>

            <div className="policy-block">
                <h3>Algorithmic Amplification</h3>
                <p>
                    We aim to avoid problematic algorithmic amplification:
                </p>
                <ul>
                    <li>We do not amplify extreme or shocking content for engagement</li>
                    <li>We do not create "rabbit holes" that progressively show more extreme content</li>
                    <li>We do not use engagement metrics that reward controversial content</li>
                    <li>We regularly audit our systems for unintended amplification effects</li>
                </ul>
            </div>

            <div className="policy-block">
                <h3>Feedback and Reporting</h3>
                <p>
                    If you believe our recommendation system is:
                </p>
                <ul>
                    <li>Surfacing inappropriate or policy-violating content</li>
                    <li>Not properly categorizing content</li>
                    <li>Showing repetitive or low-quality content</li>
                    <li>Exhibiting any other issues</li>
                </ul>
                <p>
                    Please contact us at: <a href="mailto:feedback@thelittleslush.fun">feedback@thelittleslush.fun</a>
                </p>
                <p>
                    Your feedback helps us improve our systems and ensure a better experience for all users.
                </p>
            </div>

            <div className="policy-block">
                <h3>Updates to These Guidelines</h3>
                <p>
                    We may update these guidelines as our platform evolves or as regulations change.
                    Significant changes will be reflected in the "Last Updated" date. We encourage
                    you to review these guidelines periodically.
                </p>
                <p>
                    Questions about our recommender system can be directed to:
                    <a href="mailto:transparency@thelittleslush.fun">transparency@thelittleslush.fun</a>
                </p>
            </div>

            <div className="policy-block">
                <h3>Regulatory Compliance</h3>
                <p>
                    This transparency information is provided in compliance with:
                </p>
                <ul>
                    <li><strong>EU Digital Services Act (DSA)</strong> - Article 27 transparency requirements</li>
                    <li><strong>Platform accountability</strong> best practices</li>
                    <li>General transparency and user empowerment principles</li>
                </ul>
            </div>
        </div>
    );
}
