import React from "react";

function Terms() {
  return (
    <section className="privacy flex justify-center items-center p-8">
      <div className="container flex flex-col justify-center gap-6">
        <div>
          <h3 className="text-2xl font-semibold">
            Terms and Conditions for MyStage Web App
          </h3>
          <span>Effective 10/04/2024</span>
        </div>
        <div>
          <p className="">
            Welcome to MyStage! By accessing or using the MyStage web app, you
            agree to comply with and be bound by the following terms and
            conditions. Please read them carefully.
          </p>
        </div>
        <div className="text-sm">
          <ol className="list list-decimal flex flex-col gap-6">
            <li>
              Acceptance of Terms
              <ul className="list list-disc px-12">
                <li>
                  By accessing or using the MyStage web app, you agree to be
                  bound by these Terms & Conditions. If you do not agree with
                  these terms, please do not use the web app.
                </li>
              </ul>
            </li>

            <li>
              Description of Service
              <ul className="list list-disc px-12">
                <li>
                  MyStage provides a web-based platform to help users identify
                  bus stages and access information about bus routes and
                  locations. All services are provided "as is" and are subject
                  to change without notice.
                </li>
              </ul>
            </li>

            <li>
              Location Services
              <ul className="list list-disc px-12">
                <li>
                  <span className="font-bold">Location Accuracy: </span> The
                  location services provided by MyStage are intended to improve
                  your experience by showing nearby bus stages. However, the
                  accuracy of location data may vary, and MyStage cannot
                  guarantee precise information at all times.
                </li>
                <li>
                  <span className="font-bold">Opt-Out: </span> You can disable
                  location tracking by adjusting your web browser settings.
                  Please note that some features of the web app may be limited
                  if location services are disabled.
                </li>
              </ul>
            </li>

            <li>
              Limitation of Liability
              <ul className="list list-disc px-12">
                MyStage is provided on an "as is" and "as available" basis. We
                do not guarantee that the web app will be uninterrupted or
                error-free. To the fullest extent permitted by law, MyStage and
                its team are not liable for any direct, indirect, incidental, or
                consequential damages resulting from:
                <li>The use or inability to use the web app.</li>
                <li>
                  Any errors or inaccuracies in the information provided by the
                  web app.
                </li>
                <li>
                  Unauthorized access to or use of your personal information.
                </li>
              </ul>
            </li>

            <li>
              Modifications to the Terms
              <ul className="px-12">
                <li>
                  MyStage reserves the right to modify these Terms & Conditions
                  at any time. We will provide notice of any significant changes
                  by updating the "Effective Date" at the top of this page.
                  Continued use of the web app after any modifications
                  constitutes acceptance of the new terms.
                </li>
              </ul>
            </li>

            <li>
              Disclaimers
              <ul className="px-12">
                <li>
                  <span className="font-bold">Accuracy of Information: </span>{" "}
                  MyStage makes every effort to provide accurate information.
                  However, bus routes, schedules, and other data may change, and
                  we cannot guarantee the completeness or accuracy of all
                  information.
                </li>
                <li>
                  <span className="font-bold">Third-Party Links: </span> MyStage
                  may contain links to third-party websites or services. We are
                  not responsible for the content, policies, or practices of
                  these third parties.
                </li>
              </ul>
            </li>
            <li>
              Contact Us
              <ul className="px-12">
                <li>
                  <div>
                    If you have any questions about these Terms & Conditions,
                    please contact us at:
                  </div>
                  <div>
                    <span>
                      Email:{" "}
                      <span className="text-[#ffa800]">
                        njugunageoffreymaina@gmail.com
                      </span>{" "}
                    </span>
                  </div>
                </li>
              </ul>
            </li>
          </ol>
        </div>
      </div>
    </section>
  );
}

export default Terms;
