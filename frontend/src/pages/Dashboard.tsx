import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { logout } from '../features/auth/authSlice';
import Card from '../components/Card';

const Workspace = styled.div`
  width: min(100%, 1040px);
  padding: 18px 0 42px;
  color: #e7eaf2;
  text-align: left;
`;

const Topbar = styled.header`
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

const Eyebrow = styled.p`
  margin: 0 0 6px;
  color: #818cf8;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
`;

const Title = styled.h2`
  margin: 0;
  color: #f8fafc;
  font-size: clamp(24px, 4vw, 34px);
  font-weight: 700;
  letter-spacing: -0.04em;
`;

const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Action = styled.span`
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

const LogoutButton = styled.button`
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

const SummaryGrid = styled.section`
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

const Stat = styled.article`
  min-width: 0;
  padding: 18px;
  border: 1px solid rgba(255, 255, 255, 0.07);
  border-radius: 14px;
  background: rgba(17, 22, 35, 0.78);
`;

const StatLabel = styled.p`
  margin: 0 0 10px;
  color: #858da0;
  font-size: 12px;
`;

const StatValue = styled.p`
  margin: 0;
  color: #f8fafc;
  font-size: 23px;
  font-weight: 700;
  letter-spacing: -0.03em;
`;

const StatChange = styled.span<{ $positive?: boolean }>`
  display: block;
  margin-top: 8px;
  color: ${({ $positive }) => ($positive ? '#34d399' : '#aeb6c8')};
  font-size: 11px;
`;

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1.35fr) minmax(280px, 0.65fr);
  gap: 14px;

  @media (max-width: 760px) {
    grid-template-columns: 1fr;
  }
`;

const Panel = styled.section`
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.07);
  border-radius: 14px;
  background: rgba(17, 22, 35, 0.78);
`;

const PanelHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 18px 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.07);
`;

const PanelTitle = styled.h3`
  margin: 0;
  color: #f1f5f9;
  font-size: 14px;
  font-weight: 650;
`;

const PanelLink = styled.span`
  color: #818cf8;
  font-size: 11px;
  font-weight: 650;
  text-decoration: none;
`;

const PaymentList = styled.div`
  padding: 4px 20px;
`;

const Payment = styled.div`
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

const PaymentDetails = styled.div`
  min-width: 0;
`;

const PaymentName = styled.p`
  overflow: hidden;
  margin: 0 0 4px;
  color: #dce2ed;
  font-size: 12px;
  font-weight: 650;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const PaymentMeta = styled.p`
  margin: 0;
  color: #737c90;
  font-size: 11px;
`;

const PaymentAmount = styled.p`
  margin: 0;
  color: #f1f5f9;
  font-size: 12px;
  font-weight: 700;
  white-space: nowrap;
`;

const Activity = styled.div`
  padding: 20px;
`;

const ProgressLabel = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  color: #aeb6c8;
  font-size: 12px;
`;

const ProgressTrack = styled.div`
  height: 8px;
  overflow: hidden;
  border-radius: 20px;
  background: #252b3a;
`;

const ProgressBar = styled.div`
  width: 72%;
  height: 100%;
  border-radius: inherit;
  background: linear-gradient(90deg, #6366f1, #818cf8);
`;

const ActivityNote = styled.p`
  margin: 14px 0 0;
  color: #737c90;
  font-size: 12px;
  line-height: 1.6;
`;

const payments = [
  { name: 'Acme Inc.', meta: 'Today, 10:42 AM', amount: '+ $2,480.00' },
  { name: 'Northstar Studio', meta: 'Yesterday, 4:18 PM', amount: '+ $890.00' },
  { name: 'Cloudline LLC', meta: 'Sep 06, 9:05 AM', amount: '+ $1,240.00' },
  { name: 'Morrow & Co.', meta: 'Sep 04, 2:31 PM', amount: '+ $640.00' },
];

export default function DashboardPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.auth.user);
  const firstName = user?.email?.split('@')[0] ?? 'there';

  function handleLogout() {
    dispatch(logout());
    navigate('/login');
  }

  return (
    <Workspace>
      <Topbar>
        <div>
          <Eyebrow>Overview</Eyebrow>
          <Title>Good morning, {firstName}</Title>
        </div>

        <Actions>
          <Action>All activity</Action>
          <LogoutButton type="button" onClick={handleLogout}>Sign out</LogoutButton>
        </Actions>
      </Topbar>

      <SummaryGrid>
        <Card>
          <StatLabel>Available balance</StatLabel>
          <StatValue>$12,840.00</StatValue>
          <StatChange $positive>+8.2% this month</StatChange>
        </Card>
        <Card>
          <StatLabel>Volume this month</StatLabel>
          <StatValue>$8,420.00</StatValue>
          <StatChange $positive>+12.5% from August</StatChange>
        </Card>
        <Card>
          <StatLabel>Successful payments</StatLabel>
          <StatValue>184</StatValue>
          <StatChange $positive>+24 this month</StatChange>
        </Card>
        <Card>
          <StatLabel>Pending payouts</StatLabel>
          <StatValue>$1,260.00</StatValue>
          <StatChange>Arrives in 2 days</StatChange>
        </Card>
      </SummaryGrid>

      <ContentGrid>
        <Panel>
          <PanelHeader>
            <PanelTitle>Recent payments</PanelTitle>
            <PanelLink>Latest</PanelLink>
          </PanelHeader>
          <PaymentList>
            {payments.map((payment) => (
              <Payment key={`${payment.name}-${payment.meta}`}>
                <PaymentDetails>
                  <PaymentName>{payment.name}</PaymentName>
                  <PaymentMeta>{payment.meta}</PaymentMeta>
                </PaymentDetails>
                <PaymentAmount>{payment.amount}</PaymentAmount>
              </Payment>
            ))}
          </PaymentList>
        </Panel>

        <Panel>
          <PanelHeader>
            <PanelTitle>Monthly goal</PanelTitle>
            <PanelLink>This month</PanelLink>
          </PanelHeader>
          <Activity>
            <ProgressLabel>
              <span>Payment volume</span>
              <strong>$8,420 / $12,000</strong>
            </ProgressLabel>
            <ProgressTrack aria-label="Payment volume progress">
              <ProgressBar />
            </ProgressTrack>
            <ActivityNote>
              You are 72% of the way to your monthly volume goal. Keep the momentum going.
            </ActivityNote>
          </Activity>
        </Panel>
      </ContentGrid>
    </Workspace>
  );
}