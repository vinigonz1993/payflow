import styled from 'styled-components';

export const Workspace = styled.div`
  width: min(100%, 1040px);
  padding: 18px 0 42px;
  color: #e7eaf2;
  text-align: left;
`;

export const Topbar = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  margin-bottom: 28px;

  @media (max-width: 640px) {
    align-items: flex-start;
    flex-direction: column;
  }
`;

export const Eyebrow = styled.p`
  margin: 0 0 6px;
  color: #818cf8;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
`;

export const Title = styled.h2`
  margin: 0;
  color: #f8fafc;
  font-size: clamp(24px, 4vw, 34px);
  font-weight: 700;
  letter-spacing: -0.04em;
`;

export const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const Action = styled.span`
  padding: 10px 14px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  color: #cbd2e3;
  font-size: 12px;
  font-weight: 650;
  text-decoration: none;
  transition: border-color 150ms ease, color 150ms ease;

  &:hover {
    border-color: rgba(129, 140, 248, 0.7);
    color: #fff;
  }
`;

export const LogoutButton = styled.button`
  padding: 10px 14px;
  border: 0;
  border-radius: 10px;
  background: #6366f1;
  color: #fff;
  font: inherit;
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;
  transition: filter 150ms ease, transform 150ms ease;

  &:hover {
    filter: brightness(1.1);
    transform: translateY(-1px);
  }
`;

export const SummaryGrid = styled.section`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 12px;
  margin-bottom: 28px;

  @media (max-width: 820px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 420px) {
    grid-template-columns: 1fr;
  }
`;

export const Stat = styled.article`
  min-width: 0;
  padding: 18px;
  border: 1px solid rgba(255, 255, 255, 0.07);
  border-radius: 14px;
  background: rgba(17, 22, 35, 0.78);
`;

export const StatLabel = styled.p`
  margin: 0 0 10px;
  color: #858da0;
  font-size: 12px;
`;

export const StatValue = styled.p`
  margin: 0;
  color: #f8fafc;
  font-size: 23px;
  font-weight: 700;
  letter-spacing: -0.03em;
`;

export const StatChange = styled.span<{ $positive?: boolean }>`
  display: block;
  margin-top: 8px;
  color: ${({ $positive }) => ($positive ? '#34d399' : '#aeb6c8')};
  font-size: 11px;
`;

export const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1.35fr) minmax(280px, 0.65fr);
  gap: 14px;

  @media (max-width: 760px) {
    grid-template-columns: 1fr;
  }
`;

export const Panel = styled.section`
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.07);
  border-radius: 14px;
  background: rgba(17, 22, 35, 0.78);
`;

export const PanelHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 18px 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.07);
`;

export const PanelTitle = styled.h3`
  margin: 0;
  color: #f1f5f9;
  font-size: 14px;
  font-weight: 650;
`;

export const PanelLink = styled.span`
  color: #818cf8;
  font-size: 11px;
  font-weight: 650;
  text-decoration: none;
`;

export const PaymentList = styled.div`
  padding: 4px 20px;
`;

export const PaymentSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
  padding: 15px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);

  &:last-child {
    border-bottom: 0;
  }
`;

export const PaymentDetails = styled.div`
  min-width: 0;
`;

export const PaymentName = styled.p`
  overflow: hidden;
  margin: 0 0 4px;
  color: #dce2ed;
  font-size: 12px;
  font-weight: 650;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const PaymentMeta = styled.p`
  margin: 0;
  color: #737c90;
  font-size: 11px;
`;

export const PaymentAmount = styled.p`
  margin: 0;
  color: #f1f5f9;
  font-size: 12px;
  font-weight: 700;
  white-space: nowrap;
`;

export const Activity = styled.div`
  padding: 20px;
`;

export const ProgressLabel = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  color: #aeb6c8;
  font-size: 12px;
`;

export const ProgressTrack = styled.div`
  height: 8px;
  overflow: hidden;
  border-radius: 20px;
  background: #252b3a;
`;

export const ProgressBar = styled.div`
  width: 72%;
  height: 100%;
  border-radius: inherit;
  background: linear-gradient(90deg, #6366f1, #818cf8);
`;

export const ActivityNote = styled.p`
  margin: 14px 0 0;
  color: #737c90;
  font-size: 12px;
  line-height: 1.6;
`;
