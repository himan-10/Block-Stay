const Recommended = () => {
  return (
    <section>
      <h3 className="text-2xl font-bold mb-6">
        Recommended For You
      </h3>

      <div className="grid md:grid-cols-4 gap-6">
        <div className="md:col-span-2 bg-slate-800 rounded-3xl overflow-hidden">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCEN--UQSIlWmZNyxjX2npXyU8OzENK_AysGAOIRby-B2_EbclSQ6V9e0R81c0i96Yu1YB42XA8JrU7CQvG-iwXpBo4Jub3xc6F8Z-RD4igJ9w1JNX28PFiIq8Iw8_2hzeluzBFYHV7G2rXLaIwcqGXK2lqf9Aio7Hgk6mAOndDYhhhxiiEEa5wxExGXUUf02tXN5ngXKO-EQ7OcPau-nl4dMwOagV1AGMWO5ebEcFIlIA87eJBoJYYAHkhYthY1TUMcVOZGD2EumDU"
            className="w-full h-64 object-cover"
          />
          <div className="p-4 text-white font-bold">
            Conrad Maldives
          </div>
        </div>
      </div>
    </section>
  );
};

export default Recommended;