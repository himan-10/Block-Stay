const ProfileHeader = () => {
  return (
    <section className="mb-12">
      <div className="relative h-56 rounded-3xl overflow-hidden">
        <img
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuBzPOA2osf-y5SEyEHoiO8kjZFteJbvWILLUoE99hozNYH7K8oINwEOEzvpreN_ZX6a5hj4cbsmyXvHHeMQ5RkjBqlL3g-p8Z5On3oEoOkSXgb5Zp11j0SPNwSIWrKqHpzFzxaJF29w9fwKSErh605-IZF87vHzZ68JHu-yeUKAkv-bG7Re9EExTAtqlzOGgGOJAn7GBQoeVaa_p4zntMrJxJovj0nAwG9I14Ut8tYRPiowouLTU05KLDDFiM5_Mdd4YZ1OdAFgOTnR"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="flex items-end gap-6 mt-[-60px] px-6">
        <img
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuCMOAKSc7hWJMMXtoPyjufYiov9Xc4jHZaRBBeUus-dsEfuhCFyTy_VLdYcj14zOZ5P0Ay8ZNBTwzQaJySVKfkm7PDfhZWmrvvmewW7WISOGGqt1W0MXYJTbVdEf9tYvxCQmKrjVhYZ5WdSNT7o-KRMf_xilmiaOilHjEzsvclqX1pHOkv_E--5VALJgc9Zcg9H5zB4kfGhLvKx1h_e0rHX306My7UNeiHIKHX3WBKKmdHBGCv3DyI6XdI9YcncZe4wYh2CRkbrFmUN"
          className="w-32 h-32 rounded-full border-4 border-black"
        />

        <div>
          <h1 className="text-3xl font-bold text-white">
            Julian Sterling
          </h1>
          <span className="text-violet-400 text-sm">
            Elite Member
          </span>
        </div>
      </div>
    </section>
  );
};

export default ProfileHeader;