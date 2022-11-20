import jwt_decode from 'jwt-decode';
import { useEffect, useState } from 'react';
import {
  ButtonMore,
  CardEmpty,
  CardJob,
  HeadingConten,
  Search,
} from './components';
import api from './configs/api';
import { Detail } from './pages';

function App() {
  const CLIENT_ID =
    '843113615203-ftfevl895ta6ov5sbsbe0pfoup3mu23t.apps.googleusercontent.com';
  const [form, setform] = useState({
    desc: '',
    location: '',
    full_time: false,
  });
  const [headingContent, setHeadingContent] = useState('Jobs List');
  const [user, setuser] = useState({});
  const [dataJobs, setdataJobs] = useState([]);
  const [page, setpage] = useState(1);
  const [loading, setloading] = useState(false);
  const [detailJobs, setdetailJobs] = useState({});

  // handlerInputForm
  const handlerChangeInput = (e) => {
    const { name, value } = e.target;
    setform({
      ...form,
      [name]: value,
    });
  };

  // handlerFetchDataJobs
  const fetchDataJobs = async () => {
    setloading(true);
    try {
      const result = await api.page(page);

      if (page === 1) {
        setdataJobs(result);
      } else {
        setdataJobs([...dataJobs, ...result]);
      }
      setloading(false);
      return result;
    } catch (error) {
      setloading(false);
      setdataJobs(dataJobs);
      alert('Something Happened');
      return error;
    }
  };

  // handlerSearchData
  const handlerSubmitSearchData = async (e) => {
    e.preventDefault();
    setloading(true);
    return await api
      .search({
        params: {
          description: form.desc,
          location: form.location.toLowerCase(),
          full_time: 'false',
        },
      })
      .then((res) => {
        setdataJobs(res);
        setloading(false);
        setHeadingContent(`Showing ${res.length} Jobs`);
        return res;
      })
      .catch((err) => {
        setloading(false);
        return err;
      });
  };

  // handler detail job
  const handlerDetailDataJobs = async (idJob) => {
    try {
      const result = await api.detail(idJob);
      setdetailJobs(result);
      localStorage.setItem('detailJobs', JSON.stringify(result));
      return result;
    } catch (error) {
      return error;
    }
  };

  const handlerBackPage = () => {
    setdetailJobs({});
    localStorage.removeItem('detailJobs');
  };

  // handlerCallBackLoginGoogle
  const handleCredentialResponse = async (response) => {
    localStorage.setItem('token', response.credential);
    let decode = jwt_decode(response.credential);
    window.location.reload();
    return await decode;
  };

  // handler login google
  const loginGoggle = async () => {
    await window.google?.accounts?.id.initialize({
      client_id: CLIENT_ID,
      callback: (data) => handleCredentialResponse(data),
    });

    await window.google?.accounts?.id.renderButton(
      document.getElementById('google-signin-button'),
      {
        theme: 'outline',
        size: 'large',
      },
    );
  };

  // handler logout
  const handlerLogout = () => {
    localStorage.removeItem('token');
    alert('Logout Success');
    window.location.reload();
  };

  useEffect(() => {
    if (localStorage.getItem('token') !== null) {
      let token = localStorage.getItem('token');
      try {
        setuser(jwt_decode(token));
        setdataJobs([]);
        fetchDataJobs();

        // check login and detail jobs
        if (localStorage.getItem('detailJobs') !== null) {
          let jobs = JSON.parse(localStorage.getItem('detailJobs'));
          handlerDetailDataJobs(jobs?.id);
        }
      } catch (error) {
        alert('Token not valid');
        localStorage.removeItem('token');
        window.location.reload();
      }
    } else {
      setuser(false);
      loginGoggle();
    }
  }, [page]);

  return (
    <div className="relative min-h-screen max-h-full bg-zinc-100">
      {/* Heading */}
      <div className="relative py-4 w-full bg-blue-700">
        <div className="relative mx-auto container flex justify-between items-center">
          <h1 className="text-2xl font-extrabold text-white">
            Github <span className="font-normal">Jobs</span>
          </h1>
          {user?.name ? (
            <div className="relative flex gap-4 items-center">
              {/* User */}
              <div className="relative flex gap-3">
                <img
                  src={user?.picture}
                  className="h-12 w-12 rounded-md"
                  alt=""
                />
                <div className="relative">
                  <h1 className="text-lg leading-relaxed font-semibold text-white">
                    {user?.name}
                  </h1>
                  <p className="text-sm font-light text-white leading-relaxed">
                    {user?.email}
                  </p>
                </div>
              </div>

              <button
                onClick={() => handlerLogout()}
                className="bg-gray-200 text-gray-500 px-4 py-2 rounded-md h-fit">
                Logout
              </button>
            </div>
          ) : (
            <button id="google-signin-button"></button>
          )}
        </div>
      </div>

      {/* Main Content */}
      <main className="relative mx-auto container mt-12">
        {/* Filter Form */}
        <Search
          form={form}
          handlerChangeInput={handlerChangeInput}
          handlerSubmitSearchData={handlerSubmitSearchData}
          setform={setform}
        />

        {detailJobs?.id && (
          <button
            className="relative mt-8 text-lg leading-relaxed font-semibold text-blue-600"
            onClick={() => handlerBackPage()}>
            Back
          </button>
        )}

        {/* Filter Result */}
        <div className="relative mt-6 bg-white border border-gray-400 p-4">
          {/* Header Content */}
          {detailJobs?.id ? null : <HeadingConten heading={headingContent} />}

          {detailJobs?.id ? (
            <Detail data={detailJobs} />
          ) : (
            <>
              {/* Content */}
              <div className="relative grid gap-4 divide-y-2 divide-gray-200 mt-4">
                {dataJobs?.length > 0 ? (
                  dataJobs?.map((job, index) => (
                    <CardJob
                      handlerDetailDataJobs={handlerDetailDataJobs}
                      job={job}
                      key={index}
                    />
                  ))
                ) : (
                  <CardEmpty
                    dataJobs={dataJobs}
                    loading={loading}
                    user={user}
                  />
                )}
              </div>

              {dataJobs?.length > 0 && !loading && (
                <ButtonMore page={page} setpage={setpage} />
              )}
            </>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
