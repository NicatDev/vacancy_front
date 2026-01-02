import { useEffect, useState } from "react";
import { Modal, Input, Select, Button } from "antd";
import { FiTrash2, FiPlus } from "react-icons/fi";
import CandidatesAPI from "../api/apiList/candidates";
import { useTranslation } from "react-i18next";

const LEVELS = [
  { value: 1, label: "20%" },
  { value: 2, label: "40%" },
  { value: 3, label: "60%" },
  { value: 4, label: "80%" },
  { value: 5, label: "100%" },
];

export default function CandidateSkillsModal({
  open,
  onClose,
  candidateId,
}) {
  const { t } = useTranslation();
  const [skills, setSkills] = useState([]);
  const [languageName, setLanguageName] = useState("");
  const [levelId, setLevelId] = useState(null);
  const [loading, setLoading] = useState(false);
  const params = {
    size: 20,
    page: 1,
  };
  const fetchSkills = async (id) => {
    if (!id) alert('11')
    try {
      const res = await CandidatesAPI.getCandidateSkill(id, params);
      setSkills(res.data?.data || []);
    } catch (e) {
      setSkills([]);
    }
  };

  useEffect(() => {
    if (open && candidateId) {
      fetchSkills(candidateId);
    }
  }, [open, candidateId]);

  const handleAdd = async () => {
    if (!languageName || !levelId) return;

    setLoading(true);
    try {
      await CandidatesAPI.addCandidateSkill(candidateId, {
        language_name: languageName,
        level_id: levelId,
      });

      setLanguageName("");
      setLevelId(null);
      fetchSkills(candidateId);
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = async (skillId) => {
    await CandidatesAPI.removeCandidateSkill(candidateId, skillId);
    fetchSkills(candidateId);
  };

  return (
    <Modal
      title="Skills"
      open={open}
      onCancel={onClose}
      footer={null}
      destroyOnClose
    >
      <div className="flex gap-2 mb-4">
        <Input
          placeholder="Language"
          value={languageName}
          onChange={(e) => setLanguageName(e.target.value)}
          style={{ width: '55%' }}
        />

        <Select
          placeholder="Level"
          options={LEVELS}
          value={levelId}
          onChange={setLevelId}
          style={{ width: '35%' }}
        />

        <Button
          type="primary"
          className="w-80"
          icon={<FiPlus />}
          loading={loading}
          onClick={handleAdd}
          style={{ width: '10%' }}
        />
      </div>

      <div className="space-y-2 max-h-[300px] overflow-auto">
        {skills.map((item) => (
          <div
            key={item.id}
            className="flex justify-between items-center bg-gray-50 px-3 py-2 rounded-md"
          >
            <div>
              <div className="font-medium">
                {item.language.name}
              </div>
              <div className="text-xs text-gray-500">
                {item.level.name}
              </div>
            </div>

            <FiTrash2
              className="text-red-500 cursor-pointer hover:scale-110 transition"
              onClick={() => handleRemove(item.id)}
            />
          </div>
        ))}

        {skills.length === 0 && (
          <p className="text-gray-400 text-sm text-center">
            {t('categories.noSkillsAdded')}
          </p>
        )}
      </div>
    </Modal>
  );
}
