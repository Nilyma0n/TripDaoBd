import Container from "../../components/ui/Container";

const Contact = () => {
  return (
    <section className="py-20 min-h-screen bg-white">
      <Container>
        <div className="max-w-3xl mx-auto">

          <h1 className="text-5xl font-bold text-center text-blue-700">
            Contact Us
          </h1>

          <form className="mt-12 space-y-6">

            <input
              type="text"
              placeholder="Your Name"
              className="w-full border rounded-xl p-4"
            />

            <input
              type="email"
              placeholder="Your Email"
              className="w-full border rounded-xl p-4"
            />

            <textarea
              rows={6}
              placeholder="Message"
              className="w-full border rounded-xl p-4"
            />

            <button className="bg-blue-700 text-white px-8 py-4 rounded-xl hover:bg-blue-800">
              Send Message
            </button>

          </form>

        </div>
      </Container>
    </section>
  );
};

export default Contact;