


const AppDetails = ({ app }) => {
    return (
        <div className="application-card">
        <p><strong>Email:</strong> {app.email}</p>
        <p><strong>Phone Number:</strong> {app.phoneNumber}</p>
        {app.cv && (
            <div>
            <strong>CV:</strong>
            <img src={app.cv} alt="CV" />
            
            </div>
        )}
        </div>
    );
    };

export default AppDetails;