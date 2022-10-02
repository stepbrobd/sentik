type Props = {};

const Table = (data: any) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Ticker</th>
          <th>Tweet</th>
          <th>Time</th>
          <th>Sentiment</th>
        </tr>
      </thead>
      <tbody>
        {data.data.map((item: any) => (
          <tr key={item.ticker}>
            <td>{item.ticker}</td>
            <td>{item.tweet}</td>
            <td>{item.time}</td>
            <td>{item.sentiment}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
