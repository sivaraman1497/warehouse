import React from "react";

function CategoryCreationForm() {
    return (
        <div className='m-auto text-center container'>
            
            <h3>Categories List</h3>

            <div>
                <form>
                    <input type="text" className="form-control" name="categoryname"/>
                </form>
            </div>
        </div>  
    )
}

export default CategoryCreationForm