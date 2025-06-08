function StatCard({ children, title, data }) {
  return (
    <div className="stat-card">
      {children}
      <div className="">
        <h2 className="text-xl font-bold">{title}</h2>
        <p className="">{data}</p>
      </div>
    </div>
  );
}

export default StatCard;
