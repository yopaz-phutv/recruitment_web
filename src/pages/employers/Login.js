import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";

function Login() {
    const required_mark = <span className="text-danger"> *</span>;
    const required_error = <div className="text-danger text-start small">Vui lòng nhập thông tin!</div>
    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm();
    const [isView, setIsView] = useState(false);
    const [msg, setMsg] = useState('');
    const nav = useNavigate();

    const onSubmit = async (inf) => {
        inf.role = 2;
        try {
            await axios.post('http://127.0.0.1:8000/api/login', inf)
                .then((res) => {
                    const data = res.data
                    console.log(data);
                    localStorage.setItem('employer_jwt', data.authorization.token)
                })
        } catch (error) {
            console.error('Lỗi:' + error);
            setMsg("Email hoặc mật khẩu không chính xác!")
        }
        await axios.get('http://127.0.0.1:8000/api/getMe', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('employer_jwt')}`,
            }
        })
            .then(res => {
                console.log(res.data)
                localStorage.setItem('company', JSON.stringify(res.data.employer))
                nav('/employer')                                
            })
            .catch(error => {
                console.error("Lỗi:" + error)
            })
    }

    useEffect(() => {
        // localStorage.clear()
        if (localStorage.getItem('employer_jwt')) {
            nav('/employer')
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            <div
                className="mx-auto"
                style={{ marginTop: "150px", width: "30%" }}
            >
                <form className="border px-4 py-3 rounded shadow" onSubmit={handleSubmit(onSubmit)}>
                    <h4 className="mb-3 text-center">Nhà tuyển dụng đăng nhập</h4>
                    <div>
                        <label htmlFor="email" className="float-start">
                            Email{required_mark}
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            name="email"
                            placeholder="Nhập email..."
                            {...register("email", { required: true })}
                        />
                        {errors.email && required_error}
                    </div>
                    <div className="mt-3">
                        <label htmlFor="passwd" className="float-start">
                            Password{required_mark}
                        </label>
                        <div className="input-group">
                            <input
                                type={isView ? "text" : "password"}
                                className="form-control border-end-0"
                                name="passwd"
                                placeholder="Nhập password..."
                                {...register("password", { required: true })}
                            />
                            <span
                                className="input-group-text border-start-0 bg-white text-secondary"
                                style={{ fontSize: "20px" }}
                                onClick={() => setIsView(!isView)}
                            >
                                {isView ? <AiFillEye /> : <AiFillEyeInvisible />}
                            </span>
                        </div>
                        {errors.password && required_error}
                    </div>
                    {msg && <div className="text-danger text-center mt-2">{msg}</div>}
                    <button type="submit" className="btn btn-primary mt-3" style={{ width: '100%' }}>
                        Đăng nhập
                    </button>
                    <div className="mt-2 text-center">
                        <Link to={`#`} style={{ textDecoration: 'none' }}>Quên mật khẩu</Link>
                    </div>
                </form>
                <div className="border shadow rounded mt-4 pt-2 text-center">
                    <p>Bạn là nhà tuyển dụng mới?
                        <Link to={`#`} style={{ textDecoration: 'none' }}> Đăng ký tài khoản</Link>
                    </p>
                </div>
            </div>
        </>
    );
}

export default Login;
