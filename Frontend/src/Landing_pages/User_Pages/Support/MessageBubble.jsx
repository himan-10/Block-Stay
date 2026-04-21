const MessageBubble = ({ type = "incoming", message, image }) => {
  const isOutgoing = type === "outgoing";

  return (
    <div className={`flex ${isOutgoing ? "flex-row-reverse ml-auto" : ""} items-start gap-4 max-w-[85%]`}>
      
      <img
        src="https://lh3.googleusercontent.com/aida-public/AB6AXuAugRKdwhjXoVJDLuBwbyPymd72uGkB-N3HL2rzRevz7AimOH1xDtAL9_e2hxHkLoUtoDyX1XVtjYeagB7CvQmJkmKlyui7usck2T7suni9dQPv0KdE7KGVZ1AZlTDSgsTxUrq86bcmxEH50GlGNFtt0N0wy0QvjurXejg-wVCLCglVV_P4WHRdSntUw2X8M3z_CZedhgDmgFLUOEBLtLlVixdpf5nX6IigrLmNNPz2OoH4she2RFgeZnuPE9GLvjUgbkW_jyGFNQCb"
        className="w-8 h-8 rounded-full"
      />

      <div className="space-y-2">
        <div
          className={`p-4 rounded-2xl ${
            isOutgoing
              ? "bg-primary-container rounded-tr-none"
              : "bg-surface-container-high rounded-tl-none"
          }`}
        >
          {image && <img src={image} className="rounded-xl mb-2" />}
          <p className="text-sm">{message}</p>
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;