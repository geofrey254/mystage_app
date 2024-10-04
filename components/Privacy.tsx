import React from "react";

function Privacy() {
  return (
    <section className="privacy flex justify-center items-center p-8">
      <div className="container flex flex-col justify-center gap-6">
        <div>
          <h3 className="text-2xl font-semibold">
            Privacy Policy for MyStage App
          </h3>
          <span>Effective 10/04/2024</span>
        </div>
        <div>
          <p className="">
            Welcome to MyStage! Your privacy is important to us. This Privacy
            Policy explains how we collect, use, and protect your personal
            information when you use our app. By using MyStage, you consent to
            the practices described in this policy.
          </p>
        </div>
        <div className="text-sm">
          <ol className="list list-decimal flex flex-col gap-6">
            <li>
              Information We Collect
              <ul className="list list-disc px-12">
                <li>
                  <span className="font-bold">Location Data:</span> To provide
                  you with location-based services, we may collect and process
                  your device's GPS location data. This data is used to improve
                  your experience within the app by providing accurate bus stage
                  information and routes.
                </li>
              </ul>
            </li>

            <li>
              How We Use Your Information
              <ul className="list list-disc px-12">
                <li>
                  <span className="font-bold">Location Services:</span> Your
                  location data allows us to show you nearby bus stages and
                  provide real-time updates. We do not use your location data
                  for any purpose other than enhancing your experience with
                  MyStage.
                </li>
                <li>
                  <span className="font-bold">User Experience:</span> We may use
                  your information to personalize your experience, improve our
                  services, and communicate with you about updates or new
                  features.
                </li>
                <li>
                  <span className="font-bold">Analytics:</span>We may collect
                  and analyze usage data to understand how our users interact
                  with MyStage and improve our app’s functionality.
                </li>
              </ul>
            </li>

            <li>
              Sharing Your Information
              <ul className="list list-disc px-12">
                <li>
                  <span className="font-bold">Third-Party Services:</span> We do
                  not sell, trade, or otherwise transfer your personal
                  information to outside parties. We may share non-personal
                  information with third parties for analytics purposes or to
                  help us improve our services.
                </li>
              </ul>
            </li>

            <li>
              Your rights
              <ul className="list list-disc px-12">
                <li>
                  <span className="font-bold">Opt Out:</span>You can opt-out of
                  location tracking by adjusting the settings on your device.
                  Please note that disabling location services may limit your
                  ability to use some features of the app.
                </li>
              </ul>
            </li>

            <li>
              Changes to This Privacy Policy
              <ul className="px-12">
                <li>
                  We may update this Privacy Policy from time to time. We will
                  notify you of any changes by posting the new policy on this
                  page. You are advised to review this policy periodically for
                  any changes.
                </li>
              </ul>
            </li>

            <li>
              Contact Us
              <ul className="px-12">
                <li>
                  <div>
                    If you have any questions or concerns about this Privacy
                    Policy, please contact us at:
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

export default Privacy;
