const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyNmRhYzczMjllY2ExZmU1MGMzNzIwZmNmYWQ5M2Y4ZSIsIm5iZiI6MTcxOTgzOTM1Ny4xMTA5NjIsInN1YiI6IjY1ODQ5OTRmNTFjMDFmNTdlY2ZlMjRjNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.tcT1unCzcSG7W9dYgRfD1QMoCVG4VWjGC0wzSH749Ns",
  },
};

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

async function getData(setData, setError, setLoading, url, getBackdrop) {
  try {
    setLoading(true);
    const response = await fetch(url, options);
    if (response.ok) {
      const data = await response.json();
      const usefulData = data.results.filter(
        (item) => item.poster_path && item.backdrop_path
      );
      if (usefulData.length === 0)
        throw new Error(
          "Sorry. We could not find any results for this search."
        );
      await delay(500);
      setError(null);
      setData(usefulData);
      if (getBackdrop) getBackdrop(usefulData);
      setLoading(false);
    } else {
      throw new Error("Failed to fetch data. Please check your connection.");
    }
  } catch (error) {
    setData(null);
    setError(error);
    setLoading(false);
  }
}

export default getData;
