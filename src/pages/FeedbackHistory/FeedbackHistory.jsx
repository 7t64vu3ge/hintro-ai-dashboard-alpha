<tbody>
  {feedbacks.length > 0 ? (
    feedbacks.map((item, idx) => {
      let desc = item.comment || "";

      if (desc.length > 40) {
        desc = desc.substring(0, 40) + "...";
      }

      return (
        <tr key={idx}>
          <td>Feedback Title</td>

          <td className="feedback-rating-stars">
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                className={
                  star <= item.rating
                    ? "star-filled"
                    : "star-empty"
                }
              >
                ★
              </span>
            ))}
          </td>

          <td>
            {desc || "Had issues understanding boxy control...."}
          </td>

          <td>{formatDate(item.timestamp)}</td>

          <td>{formatTime(item.timestamp)}</td>
        </tr>
      );
    })
  ) : (
    <tr>
      <td colSpan="5" className="feedback-empty-state">
        <p className="feedback-empty-text">
          No feedbacks yet
        </p>

        <button
          className="feedback-give-btn"
          onClick={() => setIsFeedbackOpen(true)}
        >
          Give Feedback
        </button>
      </td>
    </tr>
  )}
</tbody>