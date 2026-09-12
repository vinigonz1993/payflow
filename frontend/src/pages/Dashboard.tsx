import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { logout } from '../features/auth/authSlice';
import { fetchPayments } from '../features/payment/paymentSlice';
import Card from '../components/Card';
import {
  Workspace,
  Topbar,
  Eyebrow,
  Title,
  Actions,
  Action,
  LogoutButton,
  SummaryGrid,
  Stat,
  StatLabel,
  StatValue,
  StatChange,
  ContentGrid,
  Panel,
  PanelHeader,
  PanelTitle,
  PanelLink,
  PaymentList,
  PaymentSection,
  PaymentDetails,
  PaymentName,
  PaymentMeta,
  PaymentAmount,
  Activity,
  ProgressLabel,
  ProgressTrack,
  ProgressBar,
  ActivityNote,
} from '../components/dashboard/DashboardStyles';

export default function DashboardPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.auth.user);
  const paymentsData = useAppSelector((state) => state.payment.items);
  const firstName = user?.email?.split('@')[0] ?? 'there';

  const payments = paymentsData.map((payment) => ({
    name: payment.recipientId,
    meta: new Date(payment.createdAt).toLocaleString(),
    amount: `+ $${(payment.amount / 100).toFixed(2)}`,
  }));

  function handleLogout() {
    dispatch(logout());
    navigate('/login');
  }

  useEffect(() => {
    dispatch(fetchPayments());
  }, [dispatch]);

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
              <PaymentSection key={`${payment.name}-${payment.meta}`}>
                <PaymentDetails>
                  <PaymentName>{payment.name}</PaymentName>
                  <PaymentMeta>{payment.meta}</PaymentMeta>
                </PaymentDetails>
                <PaymentAmount>{payment.amount}</PaymentAmount>
              </PaymentSection>
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