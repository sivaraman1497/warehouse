import React, {useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

function ItemsList() {

    const [items, setItems] = useState([{}]);
    const [err, setErr] = useState({itemError: '', nosError:''})

    function handleSubmit(e)
    {
        document.querySelector("#iteminput").removeAttribute('disabled')

        let itemName = e.target.iteminput.value;
        let itemNos = e.target.itemnos.value;

        e.preventDefault();

        if(itemName !== '' && itemNos !== '')
        {
            if(!items.some(item => item.name === itemName))
            {
                setItems((prev) => ([...prev, {name:itemName, nos: itemNos}]))
                e.target.iteminput.value = e.target.itemnos.value = '';
            }
            else
            {
                const updateItems = [...items];
                let updateId = updateItems.findIndex((updateItem) => updateItem.name === itemName)
                updateItems[updateId] = {name:itemName, nos: itemNos}
                setItems(updateItems);

                e.target.iteminput.value = e.target.itemnos.value = '';
            }
        }

        /* R1024 - validation for both fields */
    }

    function handleEdit(name, nos)
    {
        let itemInputElement = document.querySelector("#iteminput");
        itemInputElement.value = name;
        itemInputElement.setAttribute('disabled', true)
        document.querySelector("#itemnos").value = nos;
    }

    function BackButton()
    {
        const navigate = useNavigate();
        return (
            <button className='btn btn-secondary' onClick={() => navigate(-1)}>Back</button>
        )
    }

    return (
        <>
            <BackButton/>

            <div className='container w-50 m-auto text-center mt-5'>
                <form onSubmit={handleSubmit}>
                    <div className="row">
                        <div className='col-6'>
                            <label htmlFor="iteminput" className='m-auto w-100 text-start mb-2'>Item Name</label>
                            <input type='text' name='iteminput' id='iteminput' className="form-control" autoComplete="off"/>
                            <div className='my-2 text-start text-danger'>{err.itemError}</div>
                        </div>

                        <div className='col-2'>
                        <label htmlFor="iteminput" className='m-auto w-100 text-start mb-2'>Item Nos</label>
                            <input type='number' name='itemnos' id='itemnos' className="form-control" autoComplete="off" />
                            <div className='my-2 text-start text-danger'>{err.nosError}</div>
                        </div>

                        <div className='col-1'>
                        <label htmlFor="iteminput" className='m-auto w-100 text-start mb-4'></label>
                            <button type="submit" name="addItem" id="addItem" className="btn btn-primary">+</button>
                        </div>
                    </div>
                </form>
            </div>

            <div className='container w-50 mt-5'>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>S.No</th>
                            <th>Item name</th>
                            <th>Nos</th>
                            <th colSpan="2">Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            items.map((item, index) => 
                                {
                                    return (index > 0) ?
                                        <tr key={item.name}>
                                            <td>
                                                {index}
                                            </td>

                                            <td>
                                                {item.name}
                                            </td>

                                            <td>
                                                {item.nos}
                                            </td>

                                            <td>
                                                <FontAwesomeIcon className='w-25' icon={faPenToSquare} style={{color:"crimson"}} title='Edit item' onClick={() => handleEdit(item.name, item.nos)} />

                                                <FontAwesomeIcon className='w-5' icon={faTrash} style={{color:"crimson"}} title='Delete item' onClick={(e) => {
                                                    setItems(items.filter((itemArr) => itemArr.name !== item.name));
                                                }}/>
                                            </td>
                                        </tr> : ''
                                }
                            )
                        }
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default ItemsList
