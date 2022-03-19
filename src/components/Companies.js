import React from 'react';

const Companies = ({companies}) => {
  return (
    <div>
      {companies.map(company => {
        return (
          <div key={company.id}>
            <h2>{company.name}</h2>
            <ul>
              <li>{company.catchPhrase}</li>
              <li>{company.description}</li>
              <li>{company.phone}</li>
            </ul>
          </div>
        )
      })}
    </div>
  )
}

export default Companies;