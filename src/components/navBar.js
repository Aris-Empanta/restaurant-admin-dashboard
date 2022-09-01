import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAngleDown } from "@fortawesome/free-solid-svg-icons"
import "../css/navBar.css"
import { useEffect, useState } from "react"
import { Link } from 'react-router-dom';
import { socket } from "./privateChat";
import axios from 'axios'

export const NavBar = () => {

     const [ unreadMessages, setUnreadMessages ] = useState(0)
    /*I added useEffect, because otherwise the function catalogueChoices()
      works only on second click!*/
    useEffect(() => {
                        let addProduct = document.getElementById("addProduct")
                        let preview = document.getElementById("preview")
                        let unread = document.getElementById("newMessage")

                        addProduct.style.display = "none"
                        preview.style.display = "none"       
                        
                        //The function to fetch the number  of unread messages
                        const fetchUnread = () => {

                            axios.get('http://localhost:5000/chat-messages/unread-messages')
                                 .then((res) => { 
                                                  setUnreadMessages(res.data[0].Unread)  
                                                  //If unread messages are '0', They will not be displayed in navbar. 
                                                  res.data[0].Unread === '0' ? unread.style.display = "none" : 
                                                                               unread.style.display = "initial"                                        
                                                })
                        }
                        
                        //Fetching unread messages number on component render
                        fetchUnread()                        

                        //Reevaluates unread messages on bellow listener
                        socket.on('new message', () => fetchUnread() ) 
                        
                        //An event triggered when admin's chat opens
                        socket.on('re-evaluate unread',  () => fetchUnread() )                                                
                    }, [])

 
    
    //The function that shows and hide the cataloque submenu on nav-bar.
    const catalogueChoices = () => {

                                    let addProduct = document.getElementById("addProduct")
                                    let preview = document.getElementById("preview")
                                    let catalogue = document.getElementById("catalogue")
                                    let display = preview.style.display

                                    if(display === "none"){
                                        addProduct.style.display = "initial"
                                        preview.style.display = "initial"
                                        catalogue.style.height = "150px"
                                    } else {
                                        addProduct.style.display = "none"
                                        preview.style.display = "none"
                                        catalogue.style.height = "70px"
                                    }                                
                                }
    
    return( <div className="navBar">
                <ul>
                    <li>
                        <a href="#/">Dashboard</a>
                    </li>
                    <li id="catalogue">
                        <p>Products
                            <span>
                                <button onClick={ catalogueChoices } className="angleDown" >
                                    < FontAwesomeIcon icon={ faAngleDown } />
                                </button>
                            </span>
                        </p>
                        <Link id="addProduct" className="products" to="add-product">Add Product</Link>
                        <Link id="preview" className="products" to="preview">Preview</Link>
                    </li>                  
                    <li>
                        <a href="#/">Orders</a>
                    </li>
                    <li>
                        <a href="#/">Customers</a>
                    </li>
                    <li >
                        <a  href="#/chat">Inbox <span id="newMessage">{ unreadMessages }</span></a>
                    </li>                    
                </ul>
            </div>
        )
}