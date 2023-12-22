import React from 'react'
import "./DescriptionBox.css"

const DescriptionBox = () => {
  return (
    <div className='description-box'>
          <div className="description-box-navigator">
             <div className="description-box-nav-box">Description</div>
             <div className="description-box-nav-box fade">Reviews (122)</div>
          </div>     
          <div className="description-box-description">
              <p>An e-commerce website is an online platform where individuals and businesses can buy and sell products and services over the internet. It serves as a virtual marketplace that allows customers to browse through various offerings, add desired items to a digital cart, make secure payments, and have their purchases delivered to their doorsteps..</p>
              <p>From a technical perspective, e-commerce websites incorporate various elements to facilitate online transactions, including a user-friendly interface, a secure and efficient checkout process, inventory management systems, and integration with payment processing services. Additionally, they often leverage technologies such as secure sockets layer (SSL)</p>
          </div>
    </div>
  )
}

export default DescriptionBox