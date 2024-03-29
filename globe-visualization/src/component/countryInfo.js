import '../style/countryInfo.css';

export default function CountryInfo({ CountryName, countryDescription }) {
  return CountryName ? (
    <div className='infoPanel'>
      <h1 className='infoTitle'>{CountryName} (2022)</h1>
      <div className='descriptionPannel'>
        <h2 className='infoDescription'>{countryDescription}</h2>
      </div>
    </div>
  ) : (
    <div></div>
  );
}
