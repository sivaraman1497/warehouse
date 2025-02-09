import React, {useEffect, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Link, useNavigate} from 'react-router-dom'

function SignupForm()
{
    const [message, setMessage] = useState('')
    const [value, setValue] = useState({firstname:'', lastname:'', email:'', branch:'', password:'', retypepassword:''})
    const [error, setError] = useState({firstnameError:'', lastnameError:'', emailError:'', branchError:'', passwordError:'', retypepasswordError:''})
    const [dataError, setDataError] = useState(1);

    const navigate = useNavigate()
    
    useEffect(() => {
        if(dataError === 0)
        {
            const url = 'http://localhost:5000/createUser';
            
            fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type' : 'application/json'
                },
                body: JSON.stringify({value})
            })
            .then(res => res.json())
            .then(data => setMessage(data.responseVal) && navigate('/'))
            .catch(err => console.log(err))
        }
    }, [error, dataError]);

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
                setError((prev) => ({...prev, [errorName]: `- Enter ${key}`}))
            }

            else
            {
                setError((prev) => ({...prev, [errorName]: ''}))
                errCount-=1;
            }
        }

        (errCount === 0) ? setDataError(0) : setDataError(1)
    }

    function handleChange(e)
    {
        setValue((prev) => ({...prev, [e.target.name]:e.target.value}))
    }

    return (
        <form method='POST' onSubmit={handleSubmit}>
            <div className='m-auto text-center mt-5 container w-25'>
                <div className='mt-2'>
                    <input type='text' className='form-control' name='firstname' id='firstname' autoComplete='off' placeholder='Enter firstname' onChange={handleChange} value={value.firstname}/>
                    <div className='text-danger text-start'>{error.firstnameError}</div>
                </div>

                <div className='mt-2'>
                    <input type='text' className='form-control' name='lastname' id='lastname' autoComplete='off' placeholder='Enter lastname' onChange={handleChange} value={value.lastname}/>
                    <div className='text-danger text-start'>{error.lastnameError}</div>
                </div>
                
                <div className='mt-2'>
                    <input type='email' className='form-control' name='email' id='email' autoComplete='off' placeholder='Enter email' onChange={handleChange} value={value.email}/>
                    <div className='text-danger text-start'>{error.emailError}</div>
                </div>

                <div className='mt-2'>
                    <input type='text' className='form-control' name='branch' id='branch' autoComplete='off' placeholder='Enter branch' onChange={handleChange} value={value.branch}/>
                    <div className='text-danger text-start'>{error.branchError}</div>
                </div>

                <div className='mt-2'>
                    <input type='password' className='form-control' name='password' id='password' autoComplete='off' placeholder='Enter password' onChange={handleChange}/>
                    <div className='text-danger text-start'>{error.passwordError}</div>
                </div>

                <div className='mt-2'>
                    <input type='password' className='form-control' name='retypepassword' id='retypepassword' autoComplete='off' placeholder='Retype password' onChange={handleChange}/>
                    <div className='text-danger text-start'>{error.retypepasswordError}</div>
                </div>

                <div>
                    <p>{message}</p>
                </div>

                <div>
                    <button type='submit' className='btn btn-primary' name='submit' id='submit'>Submit</button>
                </div>
                
                <div className="mt-3">
                    <span>Already have an account?</span> <Link to="/">Signin</Link>
                </div>
            </div>    
        </form>
    )
}

export default SignupForm

/* Form design + error display design */