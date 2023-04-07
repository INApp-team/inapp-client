export const switchMediaEntity = (
    type: "audio" | "video",
    stream: MediaStream | undefined,
    entity: boolean,
    entitySetter: (v: boolean) => void
) => {
    if (stream) {
        if (entity) {
            entitySetter(false);
            stream.getTracks().forEach(function (track) {
                if (track.readyState === "live" && track.kind === type) {
                    track.enabled = false;
                }
            });
        } else {
            entitySetter(true);
            stream.getTracks().forEach(function (track) {
                if (track.readyState === "live" && track.kind === type) {
                    track.enabled = true;
                }
            });
        }
    }
};
