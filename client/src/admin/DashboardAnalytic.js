import React from 'react'

const DashboardAnalytic = ({title, background,analytic}) => {
  return (
    <div className="col-md-4 col-sm-12 col-lg-3">
            <div className="analytic dashboard-analytic" style={{backgroundColor:background}}>
              <h4>{title}</h4>
              <h4>{analytic}</h4>
            </div>
          </div>
  )
}

export default DashboardAnalytic