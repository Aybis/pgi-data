import { FormInput } from '../';

export default function Index({
  handlerChangeInput,
  handlerSubmitSearchData,
  form,
  setform,
}) {
  return (
    <form
      onSubmit={handlerSubmitSearchData}
      className="relative flex gap-4 items-end h-fit">
      {/* Job Desc Input */}
      <FormInput
        label={'Job Description'}
        name="desc"
        value={form.desc}
        onChange={handlerChangeInput}
        placeholder="Filter by title, benefits, companies, expertise"
      />
      <FormInput
        label={'Location'}
        name="location"
        value={form.location}
        onChange={handlerChangeInput}
        placeholder="Filter city name, zip code, or country"
      />

      <div className="relative gap-2 w-fit">
        <label
          htmlFor="fullime"
          onClick={() => setform({ ...form, full_time: !form.full_time })}
          className="relative mb-3 flex gap-2 items-center text-gray-800 font-semibold w-fit whitespace-nowrap">
          <input type="checkbox" name="" id="" />
          Full time only
        </label>
      </div>

      <button
        type="submit"
        className="relative mt-4 bg-blue-600 flex justify-center items-center font-semibold text-white px-4 py-2.5 h-fit rounded-md w-32">
        Search
      </button>
    </form>
  );
}
