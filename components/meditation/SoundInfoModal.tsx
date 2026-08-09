import { Modal, Text, TouchableOpacity, View } from "react-native";

import type { SoundInfo } from "./constants/audio";
import InfoRow from "./InfoRow";
import { styles } from "./SoundInfoModal.styles";

type SoundInfoModalProps = {
  soundInfo: SoundInfo | null;
  onClose: () => void;
};

export default function SoundInfoModal({
  soundInfo,
  onClose,
}: SoundInfoModalProps) {
  return (
    <Modal
      visible={soundInfo !== null}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.panel}>
          <Text style={styles.title}>Sound Details</Text>
          <Text style={styles.subtitle}>Credit and licence information</Text>

          {soundInfo && (
            <>
              <InfoRow label="Title" value={soundInfo.title} />
              <InfoRow label="Creator" value={soundInfo.creator} />
              <InfoRow label="Source" value={soundInfo.source} />
              <InfoRow label="Licence" value={soundInfo.licence} />
              <InfoRow label="Style" value={soundInfo.style} />
              <InfoRow label="File" value={soundInfo.fileName} />
            </>
          )}

          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
