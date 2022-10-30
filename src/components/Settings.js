const Settings = ({ name, avatar, colour }) => {
  return (
    <div className="settings-container">
      <div className={`setting ${colour}`}>
        <h2>{name}</h2>
      </div>
      <div className="setting">
        <img src={avatar} alt={"Logo"}></img>
      </div>
      <div className="setting">
        <h3>Profile Colour</h3>
        <p>Color Picker Component Here</p>
      </div>
    </div>
  );
};

export default Settings;
