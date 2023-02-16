export const lastPurchased = (item: any) => {
  const currentDate = new Date();
  if (item === null) {
    return "Never";
  }

  const timeDifference = currentDate.getTime() - new Date(item).getTime();
  const differenceInDays = timeDifference / (1000 * 3600 * 24);

  if (differenceInDays.toFixed(0) === "0") {
    return "Today";
  }
  if (differenceInDays.toFixed(0) === "1") {
    return "Yesterday";
  }

  return differenceInDays.toFixed(0) + " Days";
};
