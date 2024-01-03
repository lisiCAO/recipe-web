import React from 'react';
import './DetailContent.scss';

const DetailContent = ({ data, config }) => {
    const renderDetails = () => {
        return (<div className="detail-content">
            {Object.entries(data).map(([key, value]) => {
                if (config.ignoreFields.includes(key)) return null;
        
                if (key === config.title) {
                    return <h2 key={key} className="detail-content__title">{value}</h2>;
                }

                if (key === config.image) {
                    return (
                        <div key={key} className="detail-content__image">
                            <img src={value ? `http://localhost:8000${value}` : "http://localhost:8000/storage/img/default.png"} 
                                alt={data[config.title] || "Default"} 
                                className="detail-content__image" />
                        </div>
                    );
                }
        
                if (key === config.instructions) {
                    return (
                        <div key={key} className="detail-content__item">
                            <strong>Instructions: </strong>
                            <p>{value}</p>
                        </div>
                    );
                }
                
                return (
                    <div key={key} className="detail-content__item">
                        <strong className="detail-content__label">{camelCaseToWords(key)}: </strong>
                        <span className="detail-content__value">{value}</span>
                    </div>
                );
            })}
        </div>
    );
};

    return (
        <>
          {renderDetails()}
        </>
      );
    };

function camelCaseToWords(str) {
    return str.replace(/([A-Z])/g, ' $1').replace(/^./, function(str){ return str.toUpperCase(); })
}

export default DetailContent;
