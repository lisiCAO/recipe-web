import React from 'react';

const DetailContent = ({ data, config }) => {
    const renderDetails = () => {
        return Object.entries(data).map(([key, value]) => {
            if (config.ignoreFields.includes(key)) return null;
    
            if (key === config.title) {
                return <h2 key={key}>{value}</h2>;
            }
    
            if (key === config.image) {
                return (
                    <div key={key} className="detail-item">
                        {value ? (
                            <img src={`http://localhost:8000${value}`} alt={data[config.title]} />
                        ) : (
                            <img src="http://localhost:8000/storage/img/default.png" alt="Default" />
                        )}
                    </div>
                );
            }
    
            if (key === config.instructions) {
                return (
                    <div key={key} className="detail-item">
                        <strong>Instructions: </strong>
                        <p>{value}</p>
                    </div>
                );
            }
    
            return (
                <div key={key} className="detail-item">
                    <strong>{camelCaseToWords(key)}: </strong>
                    <span>{value}</span>
                </div>
            );
        });
    };

    return (
        <div>
            {renderDetails()}
        </div>
    );
};

function camelCaseToWords(str) {
    return str.replace(/([A-Z])/g, ' $1').replace(/^./, function(str){ return str.toUpperCase(); })
}

export default DetailContent;
