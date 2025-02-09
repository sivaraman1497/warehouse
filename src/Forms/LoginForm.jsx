import React, {useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate, Link } from 'react-router-dom';
import { useUser } from '../Custom/UserContext';    //custom hook

function LoginForm()
{
    const [value, setValue] = useState({email:'', password:''});
    const [error, setError] = useState({emailError:'', passwordError:''});
    const [dataError, setDataError] = useState('');
    const [dataDb, setdataDb] = useState('');
    const { setUsername } = useUser();  // custom hook

    const navigate = useNavigate();

    useEffect(() => {
        if(dataError === 0)
        {   
            const url = 'http://localhost:5000/verifyUser';

            fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type' : 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({value})
            })
            .then((res) => res.json())
            .then(
                (data) => {
                    if(data.dataVal == 'success')
                    {
                        setdataDb(data.dataVal)
                        setUsername(data.firstname)
                        navigate('/my'); 
                    }
                }
            )
            .catch((err) => console.log(err))
        }
    }, [error, dataError])

    useEffect(() => {
        const url = 'http://localhost:5000/loggedin';

        fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type' : 'application/json',
            },
            credentials: 'include',
        })
        .then(res => res.json())
        .then((data) => (data.loggedIn) ? navigate('/my') : '')
    }, [])
    
    function handleSubmit(e)
    {
        e.preventDefault();

        let errCount = Object.keys(value).length;

        for(let key in value)
        {
            let elementName = value[`${key}`];
            let errorName = `${key}Error`;

            if(elementName === '')
            {
                setError((prev) => ({...prev, [errorName]:`Enter ${key}`}))
            }

            else
            {
                setError((prev) => ({...prev, [errorName]:''}))
                errCount-=1;
            }
        }

        (errCount === 0) ? setDataError(0) : setDataError(1)
    }

    function handleInputChange(e)
    {
        setValue((prev) => ({...prev, [e.target.name]:e.target.value}))       
    }

    return (
        <div className='container m-auto text-center w-25 mt-5'>
            <form method='POST' onSubmit={handleSubmit}>
                <div>
                {dataDb}
                </div>

                <div>
                    <input type='text' className='form-control mt-2' name='email' id='email' autoComplete='off' placeholder='Enter email' onChange={handleInputChange} value={value.email}/>
                    <div className='text-danger mt-2' id='emailError'>{error.emailError}</div>
                </div>
                <div>
                    <input type='password' className='form-control mt-2' name='password' id='password' autoComplete='off' placeholder='Enter password' onChange={handleInputChange}/>
                    <div className='text-danger mt-2' id='passwordError'>{error.passwordError}</div>
                </div>
                <div>
                    <button type='submit' className='btn btn-primary mt-3' name='submit'>Login</button>
                </div>

                <div className="mt-3">
                    <span>
                        Don't have an account? <Link to="/signup">Signup</Link>
                    </span>
                </div>
            </form>
        </div>
    )
    
}

export default LoginForm