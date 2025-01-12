import React, { useState } from "react";

const ContactUs = () => {
  const [sucess, setSucess] = useState<boolean>(false);
  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);

    formData.append("access_key", "e3d8654b-e6e2-46c5-bc94-14fca5e25713");

    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: json,
    }).then((res) => res.json());

    if (res.success) {
      console.log("Success", res);
      setSucess(true);
    }
  };

  return (
    <section className="dark-bg  px-7 py-12 section-five">
      <h1 className="text-5xl text-center font-bold primary-color mb-8">
        CONTACT.
      </h1>
      <div className="contact-us-card w-full md:w-[30rem] p-8 h-[36rem] flex flex-col items-center justify-center relative z-20">
        {sucess ? (
          <img src="/images/Animation.gif" alt="right" width={200} />
        ) : (
          <>
            {" "}
            <h3 className="text-xl text-white font-bold">💌 Get In Touch</h3>
            <form
              className="flex flex-col items-center gap-5 mt-5 mx-4 w-full"
              onSubmit={onSubmit}
            >
              <div className="flex flex-col items-start gap-2 w-full">
                <label className="m-0 block text-base font-medium text-white">
                  Name *
                </label>
                <input
                  type="text"
                  placeholder="Name"
                  name="name"
                  required
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline bg-transparent bg-white bg-opacity-5 border-gray-500 hover:bg-opacity-10 focus:border-[#dd3d1d]"
                />
              </div>
              <div className="flex flex-col items-start gap-2 w-full">
                <label className="m-0 block text-base font-medium text-white">
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  required
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline bg-transparent bg-white bg-opacity-5 border-gray-500 hover:bg-opacity-10 focus:border-[#dd3d1d]"
                />
              </div>
              <div className="flex flex-col items-start gap-2 w-full">
                <label className="m-0 block text-base font-medium text-white">
                  Description *
                </label>
                <textarea
                  placeholder="Enter the description *"
                  name="message"
                  required
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline bg-transparent bg-white bg-opacity-5 border-gray-500 hover:bg-opacity-10 h-36 focus:border-[#dd3d1d]"
                ></textarea>
              </div>
              <button
                type="submit"
                className="raindbow-bg rounded-md border-2 border-green-900 w-full text-[#3b3838] text-xl font-bold p-2 mt-4"
              >
                SEND
              </button>
            </form>
          </>
        )}
      </div>
    </section>
  );
};

export default ContactUs;
