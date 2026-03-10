import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { IoWaterOutline, IoRestaurantOutline, IoBookOutline } from 'react-icons/io5';
import { GiBroom } from 'react-icons/gi';
import '../styles/call-staff.scss';

export default function CallStaff({ open = true, onClose = () => { }, onSubmit = (data) => { } }) {
    const { t } = useTranslation();
    const [selectedOption, setSelectedOption] = useState('');
    const [note, setNote] = useState('');

    const quickOptions = [
        { id: 'water', icon: <IoWaterOutline />, label: t('callstaff.addWater') },
        { id: 'cutlery', icon: <IoRestaurantOutline />, label: t('callstaff.addCutlery') },
        { id: 'others', icon: '...', label: t('callstaff.others') },
        { id: 'clean', icon: <GiBroom />, label: t('callstaff.cleanTable') },
        { id: 'menu', icon: <IoBookOutline />, label: t('callstaff.menuAdvice') },
    ];

    if (!open) return null;

    const handleSubmit = () => {
        const requestData = {
            category: selectedOption || t('callstaff.other'),
            note: note.trim()
        };
        onSubmit(requestData);
        setSelectedOption('');
        setNote('');
    };

    return (
        <div className="rm-cs-overlay" role="dialog" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
            <div className="rm-cs-modal">
                <div className="rm-cs-grip-line" />

                <div className="rm-cs-header">
                    <h2 className="rm-cs-title">{t('callstaff.title')}</h2>
                    <p className="rm-cs-subtitle">{t('callstaff.selectOption')}</p>
                </div>

                {/* Grid chọn nhanh */}
                <div className="rm-cs-grid">
                    {quickOptions.map((option) => (
                        <div
                            key={option.id}
                            className={`rm-cs-option ${selectedOption === option.label ? 'active' : ''}`}
                            onClick={() => setSelectedOption(option.label)}
                        >
                            <span className="rm-cs-icon">{option.icon}</span>
                            <span className="rm-cs-label">{option.label}</span>
                        </div>
                    ))}
                </div>

                {/* Ô nhập ghi chú */}
                <div className="rm-cs-input-group">
                    <label className="rm-cs-label-text">{t('callstaff.note')}:</label>
                    <textarea
                        className="rm-cs-textarea"
                        placeholder={t('callstaff.notePlaceholder')}
                        rows="3"
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                    />
                </div>

                <div className="rm-cs-actions">
                    <button className="rm-cs-btn rm-cs-btn-close" onClick={onClose}>{t('callstaff.cancel')}</button>
                    <button
                        className="rm-cs-btn rm-cs-btn-call"
                        onClick={handleSubmit}
                    >
                        {t('callstaff.title')}
                    </button>
                </div>
            </div>
        </div>
    );
}